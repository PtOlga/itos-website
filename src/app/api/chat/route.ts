import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt } from '@/lib/chatbot/systemPrompt'

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

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 400,
    system: buildSystemPrompt(locale ?? 'sv'),
    messages,
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''

  // Extract lead data if Claude included the <lead> block
  const leadMatch = text.match(/<lead>([\s\S]*?)<\/lead>/)
  const leadData = leadMatch ? JSON.parse(leadMatch[1].trim()) : null

  // Strip the <lead> block from the visible message
  const visibleText = text.replace(/<lead>[\s\S]*?<\/lead>/, '').trim()

  // Fire-and-forget lead creation
  if (leadData) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? ''
    fetch(`${baseUrl}/api/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData),
    }).catch(() => {})
  }

  return NextResponse.json({ message: visibleText, hasLead: !!leadData })
}
