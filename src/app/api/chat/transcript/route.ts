import { NextRequest, NextResponse } from 'next/server'
import { sendChatTranscript } from '@/lib/notifications/telegram'
import type { ChatTranscript, ChatTranscriptMessage } from '@/lib/notifications/types'

const MAX_MESSAGES = 50
const MAX_CONTENT_LEN = 2000

function isValidMessage(m: unknown): m is ChatTranscriptMessage {
  if (!m || typeof m !== 'object') return false
  const obj = m as Record<string, unknown>
  return (
    (obj.role === 'user' || obj.role === 'assistant') &&
    typeof obj.content === 'string' &&
    obj.content.length > 0 &&
    obj.content.length <= MAX_CONTENT_LEN
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Partial<ChatTranscript>
    const { sessionId, locale, startedAt, messages } = body

    if (
      typeof sessionId !== 'string' || !sessionId ||
      (locale !== 'sv' && locale !== 'en') ||
      typeof startedAt !== 'string' || !startedAt ||
      !Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES
    ) {
      return new NextResponse(null, { status: 204 })
    }

    const clean = messages.filter(isValidMessage)
    const hasUserMessage = clean.some(m => m.role === 'user')
    if (!hasUserMessage) {
      return new NextResponse(null, { status: 204 })
    }

    await sendChatTranscript({ sessionId, locale, startedAt, messages: clean })
  } catch (err) {
    console.error('[chat/transcript] failed:', err)
  }

  return new NextResponse(null, { status: 204 })
}
