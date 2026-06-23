'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { useLocale } from 'next-intl'
import { MessageCircle, X, Send, Loader2 } from 'lucide-react'
import type { Locale } from '@/i18n/config'
import type { ChatMessage } from '@/app/api/chat/route'

const WHATSAPP_NUMBER = '46737686471'

const WELCOME: Record<string, string> = {
  sv: 'Hej! 👋 Jag är ITOS-assistenten. Vad kan jag hjälpa dig med idag? Webbplats, CRM, automatisering eller något annat?',
  en: 'Hi! 👋 I\'m the ITOS assistant. What can I help you with today? A website, CRM, automation, or something else?',
}

const PRIVACY_NOTICE: Record<string, { text: string; href: string }> = {
  sv: { text: 'Konversationer kan granskas för att förbättra servicen.', href: '/privacy-policy' },
  en: { text: 'Conversations may be reviewed to improve our service.',    href: '/en/privacy-policy' },
}

function newSession() {
  const sessionId =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `s_${Date.now()}_${Math.random().toString(36).slice(2)}`
  return { sessionId, startedAt: new Date().toISOString() }
}

export default function ChatWidget() {
  const locale = useLocale() as Locale
  const [open, setOpen]       = useState(false)
  const [input, setInput]     = useState('')
  const [loading, setLoading] = useState(false)
  const [showWA, setShowWA]   = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: WELCOME[locale] ?? WELCOME.en },
  ])
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)
  const sessionRef = useRef(newSession())
  const messagesRef = useRef<ChatMessage[]>(messages)
  const transcriptSentRef = useRef(false)

  useEffect(() => { messagesRef.current = messages }, [messages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100)
  }, [open])

  const sendTranscript = useCallback(() => {
    if (transcriptSentRef.current) return
    const current = messagesRef.current
    if (!current.some(m => m.role === 'user')) return

    transcriptSentRef.current = true
    const payload = JSON.stringify({
      sessionId: sessionRef.current.sessionId,
      locale,
      startedAt: sessionRef.current.startedAt,
      messages: current,
    })

    try {
      if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
        navigator.sendBeacon('/api/chat/transcript', new Blob([payload], { type: 'application/json' }))
      } else {
        void fetch('/api/chat/transcript', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          keepalive: true,
        }).catch(() => {})
      }
    } catch {
      // ignore — transcript delivery is best-effort
    }
  }, [locale])

  useEffect(() => {
    const handler = () => sendTranscript()
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [sendTranscript])

  function closeAndReset() {
    sendTranscript()
    setOpen(false)
    setMessages([{ role: 'assistant', content: WELCOME[locale] ?? WELCOME.en }])
    setInput('')
    setShowWA(false)
    sessionRef.current = newSession()
    transcriptSentRef.current = false
  }

  async function send() {
    const text = input.trim()
    if (!text || loading) return

    const updated: ChatMessage[] = [...messages, { role: 'user', content: text }]
    setMessages(updated)
    setInput('')
    setLoading(true)

    try {
      // Anthropic API requires the first message to be 'user' — strip the welcome assistant message
      const firstUserIdx = updated.findIndex(m => m.role === 'user')
      const apiMessages = firstUserIdx >= 0 ? updated.slice(firstUserIdx) : updated

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, locale }),
      })
      const data = await res.json()
      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
        if (data.hasLead) setShowWA(true)
      } else if (data.error) {
        throw new Error(data.error)
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: locale === 'sv' ? 'Ett fel uppstod. Försök igen.' : 'An error occurred. Please try again.',
      }])
    } finally {
      setLoading(false)
    }
  }

  const waText = encodeURIComponent(
    locale === 'sv'
      ? 'Hej! Jag chattade nyss på er webbplats och vill gärna diskutera mitt projekt.'
      : 'Hi! I just chatted on your website and would like to discuss my project.'
  )
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label='Open chat'
        className='fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#F07B2A] text-white shadow-[0_8px_30px_rgba(240,123,42,0.45)] transition-transform duration-300 hover:scale-110'
      >
        {open
          ? <X className='h-6 w-6' />
          : <MessageCircle className='h-6 w-6' />
        }
      </button>

      {/* Chat panel */}
      {open && (
        <div className='fixed bottom-24 right-6 z-50 flex w-[340px] flex-col rounded-[1.5rem] border border-BorderLine bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)] dark:border-dark_border dark:bg-darklight sm:w-[380px]'>

          {/* Header */}
          <div className='flex items-center gap-3 rounded-t-[1.5rem] bg-[#F07B2A] px-5 py-4'>
            <div className='flex h-9 w-9 items-center justify-center rounded-full bg-white/20'>
              <MessageCircle className='h-5 w-5 text-white' />
            </div>
            <div>
              <p className='text-sm font-semibold text-white'>ITOS Assistant</p>
              <p className='text-xs text-white/80'>
                {locale === 'sv' ? 'Svarar direkt' : 'Replies instantly'}
              </p>
            </div>
            <button
              onClick={closeAndReset}
              aria-label={locale === 'sv' ? 'Stäng och rensa chatt' : 'Close and clear chat'}
              title={locale === 'sv' ? 'Stäng och rensa chatt' : 'Close and clear chat'}
              className='ml-auto flex h-8 w-8 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/20 hover:text-white'
            >
              <X className='h-5 w-5' />
            </button>
          </div>

          {/* Messages */}
          <div className='flex max-h-72 flex-col gap-3 overflow-y-auto p-4'>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#F07B2A] text-white'
                    : 'bg-AliceBlue text-secondary dark:bg-secondary dark:text-white'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className='flex justify-start'>
                <div className='rounded-2xl bg-AliceBlue px-4 py-2.5 dark:bg-secondary'>
                  <Loader2 className='h-4 w-4 animate-spin text-SlateBlue dark:text-darktext' />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* WhatsApp CTA */}
          {showWA && (
            <div className='mx-4 mb-2 rounded-xl bg-[#FFF7EF] p-3 dark:bg-[#F07B2A]/10'>
              <p className='mb-2 text-xs text-SlateBlue dark:text-darktext'>
                {locale === 'sv' ? 'Fortsätt på WhatsApp:' : 'Continue on WhatsApp:'}
              </p>
              <a
                href={waHref}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90'
              >
                <svg viewBox='0 0 24 24' fill='currentColor' className='h-4 w-4'>
                  <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z'/>
                </svg>
                WhatsApp
              </a>
            </div>
          )}

          {/* Input */}
          <div className='flex items-center gap-2 border-t border-BorderLine p-3 dark:border-dark_border'>
            <input
              ref={inputRef}
              type='text'
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={locale === 'sv' ? 'Skriv ett meddelande...' : 'Type a message...'}
              className='flex-1 rounded-xl border border-BorderLine bg-AliceBlue px-3 py-2 text-sm text-secondary outline-none transition-colors focus:border-[#F07B2A] dark:border-dark_border dark:bg-secondary dark:text-white'
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label='Send'
              className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F07B2A] text-white transition-opacity disabled:opacity-40'
            >
              <Send className='h-4 w-4' />
            </button>
          </div>

          {/* Privacy notice */}
          <p className='px-4 pb-3 text-[10px] leading-snug text-gray-400 dark:text-gray-500'>
            {PRIVACY_NOTICE[locale]?.text ?? PRIVACY_NOTICE.en.text}{' '}
            <a
              href={PRIVACY_NOTICE[locale]?.href ?? PRIVACY_NOTICE.en.href}
              target='_blank'
              rel='noopener noreferrer'
              className='underline transition-colors hover:text-[#F07B2A]'
            >
              {locale === 'sv' ? 'Integritetspolicy' : 'Privacy policy'}
            </a>
          </p>

        </div>
      )}
    </>
  )
}
