'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Lottie from 'lottie-react'
import contactAnimation from '../../../../public/animations/contact-us-itos.json'
import emailjs from '@emailjs/browser'

const SERVICE_ID = 'service_ji0tfkm'
const TEMPLATE_ID = 'template_fzdqm4x'
const PUBLIC_KEY = 'u3MskHaERL6uivJcK'

const ContactForm = () => {
  const t = useTranslations('contact')

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone || '—',
          message: formData.message,
        },
        PUBLIC_KEY
      )
      setStatus('success')
      setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' })
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className='dark:bg-darkmode pt-0 md:pb-24 pb-10'>
      <div className='container'>
        <div className='grid lg:grid-cols-2 grid-cols-1 md:gap-20 gap-10 items-center'>

          {/* Form — left */}
          <div>
            <h2 className='sm:text-[40px] sm:leading-[3rem] text-[28px] leading-[2.25rem] font-bold text-secondary dark:text-white mb-9'>
              {t('form.title')}
            </h2>

            {status === 'success' ? (
              <div className='py-8'>
                <p className='text-primary text-xl font-medium mb-4'>
                  {t('form.successMessage')}
                </p>
                <Button
                  onClick={() => setStatus('idle')}
                  variant='outline'
                  className='mt-2'>
                  ← {t('form.sendAnother')}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='flex flex-wrap w-full justify-between'>

                {/* First + Last name */}
                <div className='sm:flex gap-3 w-full'>
                  <div className='mx-0 my-2.5 flex-1 space-y-2'>
                    <Label htmlFor='firstName'>{t('form.firstName')} *</Label>
                    <Input
                      id='firstName'
                      type='text'
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mx-0 my-2.5 flex-1 space-y-2'>
                    <Label htmlFor='lastName'>{t('form.lastName')} *</Label>
                    <Input
                      id='lastName'
                      type='text'
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className='sm:flex gap-3 w-full'>
                  <div className='mx-0 my-2.5 flex-1 space-y-2'>
                    <Label htmlFor='email'>{t('form.email')} *</Label>
                    <Input
                      id='email'
                      type='email'
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mx-0 my-2.5 flex-1 space-y-2'>
                    <Label htmlFor='phone'>{t('form.phone')}</Label>
                    <Input
                      id='phone'
                      type='tel'
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className='mx-0 my-2.5 w-full space-y-2'>
                  <Label htmlFor='message'>{t('form.message')} *</Label>
                  <Textarea
                    id='message'
                    required
                    rows={5}
                    placeholder={t('form.messagePlaceholder')}
                    value={formData.message}
                    onChange={handleChange}
                    className='resize-none'
                  />
                </div>

                {status === 'error' && (
                  <p className='text-red-500 text-sm w-full mt-1'>
                    {t('form.errorMessage')}
                  </p>
                )}

                <div className='mx-0 my-2.5 w-full'>
                  <Button
                    type='submit'
                    disabled={loading}
                    className='bg-primary hover:bg-darkprimary mt-4 px-8 py-6'>
                    {loading ? '...' : t('form.submit')}
                  </Button>
                </div>

              </form>
            )}
          </div>

          {/* Animation — right */}
          <div className='hidden lg:flex items-center justify-center'>
            <Lottie
              animationData={contactAnimation}
              loop={true}
              className='w-full max-w-md'
            />
          </div>

        </div>
      </div>
    </section>
  )
}

export default ContactForm
