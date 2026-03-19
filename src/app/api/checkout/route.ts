import Stripe from 'stripe'
import { NextRequest, NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      amount,
      currency,
      customerName,
      customerEmail,
      projectType,
      selectedOptions,
      notes,
    } = body

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: `Website project: ${projectType}`,
              description: selectedOptions.length > 0
                ? `Options: ${selectedOptions.join(', ')}${notes ? '. Notes: ' + notes : ''}`
                : notes || 'IT consulting services',
            },
            unit_amount: amount * 100, // Stripe считает в центах/эре
          },
          quantity: 1,
        },
      ],
      metadata: {
        customerName,
        projectType,
        selectedOptions: selectedOptions.join(', '),
        notes: notes || '',
      },
      success_url: `${baseUrl}/${currency === 'sek' ? '' : 'en/'}pricing?success=true`,
      cancel_url: `${baseUrl}/${currency === 'sek' ? '' : 'en/'}pricing?cancelled=true`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}