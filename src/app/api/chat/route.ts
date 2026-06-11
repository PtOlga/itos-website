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

  try {
    const response = await client.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 400,
      system: buildSystemPrompt(locale ?? 'sv'),
      messages,
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    const leadMatch = text.match(/<lead>([\s\S]*?)<\/lead>/)
    let leadData = null
    if (leadMatch) {
      try { leadData = JSON.parse(leadMatch[1].trim()) } catch {}
    }

    const visibleText = text.replace(/<lead>[\s\S]*?<\/lead>/, '').trim()

    if (leadData) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'
      fetch(`${baseUrl}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      }).catch(() => {})
    }

    return NextResponse.json({ message: visibleText, hasLead: !!leadData })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('[chat] Claude error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
