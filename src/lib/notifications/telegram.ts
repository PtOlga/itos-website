import type { ChatTranscript, LeadData } from './types'

const TELEGRAM_MESSAGE_LIMIT = 4096
const TRANSCRIPT_BODY_BUDGET = 3500

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    console.warn('[telegram] skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set')
    return
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    })
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      console.error(`[telegram] API responded ${res.status}: ${body.slice(0, 300)}`)
    }
  } catch (err) {
    console.error('[telegram] notification failed:', err)
  }
}

export async function sendLeadToTelegram(lead: LeadData): Promise<void> {
  const text =
    `🔔 <b>Новый лид с сайта!</b>\n\n` +
    `👤 <b>Имя:</b> ${escapeHtml(lead.name)}\n` +
    `📬 <b>Контакт:</b> ${escapeHtml(lead.contact)}\n` +
    `💼 <b>Проект:</b> ${escapeHtml(lead.project)}\n` +
    `💰 <b>Бюджет:</b> ${escapeHtml(lead.budget || 'не указан')}`

  await sendTelegramMessage(text)
}

export async function sendChatTranscript(transcript: ChatTranscript): Promise<void> {
  const { sessionId, locale, startedAt, messages } = transcript
  const startedLabel = new Date(startedAt).toISOString().replace('T', ' ').slice(0, 16) + ' UTC'

  const header =
    `💬 <b>Chat transcript</b>\n` +
    `🗓 ${startedLabel} · Locale: ${locale} · ${messages.length} messages\n` +
    `🆔 <code>${escapeHtml(sessionId)}</code>\n\n`

  const lines: string[] = []
  let used = 0
  let truncatedAt = -1

  for (let i = 0; i < messages.length; i++) {
    const m = messages[i]
    const prefix = m.role === 'user' ? '👤' : '🤖'
    const line = `${prefix} ${escapeHtml(m.content)}`
    if (used + line.length + 1 > TRANSCRIPT_BODY_BUDGET) {
      truncatedAt = i
      break
    }
    lines.push(line)
    used += line.length + 1
  }

  let body = lines.join('\n\n')
  if (truncatedAt >= 0) {
    const remaining = messages.length - truncatedAt
    body += `\n\n…[truncated, ${remaining} more message${remaining === 1 ? '' : 's'}]`
  }

  const text = (header + body).slice(0, TELEGRAM_MESSAGE_LIMIT)
  await sendTelegramMessage(text)
}
