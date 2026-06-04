import { NextRequest, NextResponse } from 'next/server'

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
  })
}

async function createZohoLead(data: {
  name: string
  contact: string
  project: string
  budget: string
}) {
  const token = process.env.ZOHO_ACCESS_TOKEN
  const domain = process.env.ZOHO_DOMAIN ?? 'zohoapis.eu'
  if (!token) return

  const [firstName, ...rest] = data.name.trim().split(' ')
  const lastName = rest.join(' ') || '-'
  const isEmail = data.contact.includes('@')

  await fetch(`https://www.${domain}/crm/v2/Leads`, {
    method: 'POST',
    headers: {
      Authorization: `Zoho-oauthtoken ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: [{
        First_Name: firstName,
        Last_Name: lastName,
        Email: isEmail ? data.contact : undefined,
        Phone: !isEmail ? data.contact : undefined,
        Description: `Project: ${data.project}\nBudget: ${data.budget}`,
        Lead_Source: 'Website Chat',
      }],
    }),
  })
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const { name, contact, project, budget } = data

  // Telegram notification
  await sendTelegram(
    `🔔 <b>Новый лид с сайта!</b>\n\n` +
    `👤 <b>Имя:</b> ${name}\n` +
    `📬 <b>Контакт:</b> ${contact}\n` +
    `💼 <b>Проект:</b> ${project}\n` +
    `💰 <b>Бюджет:</b> ${budget || 'не указан'}`
  )

  // Zoho CRM
  await createZohoLead({ name, contact, project, budget })

  return NextResponse.json({ ok: true })
}
