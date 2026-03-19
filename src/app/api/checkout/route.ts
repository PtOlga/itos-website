import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

const ALLOWED_CURRENCIES = new Set(['eur', 'sek'])
const DEFAULT_DESCRIPTION = 'IT consulting services'
const MAX_METADATA_LENGTH = 500
const MAX_DESCRIPTION_LENGTH = 1000

function trimToLength(value: unknown, maxLength: number) {
  if (typeof value !== 'string') {
    return ''
  }
  return value.trim().slice(0, maxLength)
}

function normalizeBaseUrl(rawBaseUrl: string | undefined, fallbackOrigin: string) {
  const candidate = rawBaseUrl?.trim()
  const possibleValues = [
    candidate,
    candidate && !/^https?:\/\//i.test(candidate) ? `https://${candidate}` : undefined,
    fallbackOrigin,
  ].filter(Boolean) as string[]

  for (const value of possibleValues) {
    try {
      return new URL(value).origin
    } catch {
      continue
    }
  }
  return fallbackOrigin
}

export async function POST(req: NextRequest) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY

    if (!stripeSecretKey) {
      console.error('STRIPE_SECRET_KEY is missing. Available env keys:', Object.keys(process.env).filter(k => k.includes('STRIPE')))
      return NextResponse.json(
        { error: 'Stripe is not configured' },
        { status: 500 }
      )
    }

    const stripe = new Stripe(stripeSecretKey)

    const body = await req.json()
    const amount = Number(body?.amount)
    const currency = typeof body?.currency === 'string' ? body.currency.toLowerCase() : ''

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    if (!ALLOWED_CURRENCIES.has(currency)) {
      return NextResponse.json({ error: 'Invalid currency' }, { status: 400 })
    }

    const customerName = trimToLength(body?.customerName, 120)
    const customerEmail = trimToLength(body?.customerEmail, 320)
    const projectType = trimToLength(body?.projectType, 80) || 'website'
    const notes = trimToLength(body?.notes, MAX_METADATA_LENGTH)
    const selectedOptions = Array.isArray(body?.selectedOptions)
      ? body.selectedOptions
          .filter((option): option is string => typeof option === 'string')
          .map((option) => trimToLength(option, 80))
          .filter(Boolean)
      : []

    const unitAmount = Math.round(amount * 100)

    if (unitAmount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    }

    const baseUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_BASE_URL, req.nextUrl.origin)
    const pricingPath = currency === 'sek' ? '/pricing' : '/en/pricing'
    const description = trimToLength(
      selectedOptions.length > 0
        ? `Options: ${selectedOptions.join(', ')}${notes ? `. Notes: ${notes}` : ''}`
        : notes || DEFAULT_DESCRIPTION,
      MAX_DESCRIPTION_LENGTH
    )

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'klarna'],
      mode: 'payment',
      customer_email: customerEmail || undefined,
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: `Website project: ${projectType}`,
              description,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        customerName,
        projectType,
        selectedOptions: trimToLength(selectedOptions.join(', '), MAX_METADATA_LENGTH),
        notes,
      },
      success_url: `${baseUrl}${pricingPath}?success=true`,
      cancel_url: `${baseUrl}${pricingPath}?cancelled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    const stripeError = error as Stripe.errors.StripeError

    console.error('Stripe checkout error:', {
      message: stripeError.message,
      type: stripeError.type,
      code: 'code' in stripeError ? stripeError.code : undefined,
      requestId: 'requestId' in stripeError ? stripeError.requestId : undefined,
      statusCode: 'statusCode' in stripeError ? stripeError.statusCode : undefined,
    })

    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}