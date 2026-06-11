import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt } from '@/lib/chatbot/systemPrompt'
import { sendLeadToTelegram } from '@/lib/notifications/telegram'
import { createZohoLead } from '@/lib/notifications/zoho'
import type { LeadData } from '@/lib/notifications/types'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Simple in-memory rate limiter: max 20 messages per IP per hour
const rateMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 })
    return true
  }
  if (entry.count >= 20) return false
  entry.count++
  return true
}

export type ChatMessage = { role: 'user' | 'assistant'; content: string }

// Strip Markdown formatting so the chat bubble (plain-text rendering) doesn't
// show raw **, __, ##, backticks etc. if the model ignores the prompt rule.
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*\*(.+?)\*\*\*/g, '$1')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/__(.+?)__/g, '$1')
    .replace(/(^|[^*])\*(?!\s)([^*\n]+?)\*(?!\*)/g, '$1$2')
    .replace(/(^|[^_])_(?!\s)([^_\n]+?)_(?!_)/g, '$1$2')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Too many messages. Please try again later.' }, { status: 429 })
  }

  const { messages, locale } = await req.json() as {
    messages: ChatMessage[]
    locale: 'en' | 'sv'
  }

  if (!messages?.length) {
    return NextResponse.json({ error: 'No messages provided' }, { status: 400 })
  }

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 400,
      system: buildSystemPrompt(locale ?? 'sv'),
      messages,
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    const leadMatch = text.match(/<lead>([\s\S]*?)<\/lead>/)
    let leadData: LeadData | null = null
    if (leadMatch) {
      try { leadData = JSON.parse(leadMatch[1].trim()) as LeadData } catch {}
    }

    const visibleText = stripMarkdown(text.replace(/<lead>[\s\S]*?<\/lead>/, '').trim())

    if (leadData) {
      void Promise.allSettled([
        sendLeadToTelegram(leadData),
        createZohoLead(leadData),
      ])
    }

    return NextResponse.json({ message: visibleText, hasLead: !!leadData })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('[chat] Claude error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
