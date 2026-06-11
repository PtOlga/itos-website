import { NextRequest, NextResponse } from 'next/server'
import { sendLeadToTelegram } from '@/lib/notifications/telegram'
import { createZohoLead } from '@/lib/notifications/zoho'
import type { LeadData } from '@/lib/notifications/types'

export async function POST(req: NextRequest) {
  const lead = await req.json() as LeadData

  if (!lead?.name || !lead?.contact) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  await Promise.allSettled([
    sendLeadToTelegram(lead),
    createZohoLead(lead),
  ])

  return NextResponse.json({ ok: true })
}