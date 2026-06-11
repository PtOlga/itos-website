import type { LeadData } from './types'

export async function createZohoLead(lead: LeadData, source = 'Website Chat'): Promise<void> {
  const token = process.env.ZOHO_ACCESS_TOKEN
  const domain = process.env.ZOHO_DOMAIN ?? 'zohoapis.eu'
  if (!token) return

  const [firstName, ...rest] = lead.name.trim().split(' ')
  const lastName = rest.join(' ') || '-'
  const isEmail = lead.contact.includes('@')

  try {
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
          Email: isEmail ? lead.contact : undefined,
          Phone: !isEmail ? lead.contact : undefined,
          Description: `Project: ${lead.project}\nBudget: ${lead.budget || ''}`,
          Lead_Source: source,
        }],
      }),
    })
  } catch (err) {
    console.error('[zoho] lead creation failed:', err)
  }
}
