import type { LeadData } from './types'

export async function sendLeadToTelegram(lead: LeadData): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  const text =
    `🔔 <b>Новый лид с сайта!</b>\n\n` +
    `👤 <b>Имя:</b> ${lead.name}\n` +
    `📬 <b>Контакт:</b> ${lead.contact}\n` +
    `💼 <b>Проект:</b> ${lead.project}\n` +
    `💰 <b>Бюджет:</b> ${lead.budget || 'не указан'}`

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    })
  } catch (err) {
    console.error('[telegram] notification failed:', err)
  }
}
