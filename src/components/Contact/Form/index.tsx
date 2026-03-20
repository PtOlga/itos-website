'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import Lottie from 'lottie-react'
import contactAnimation from '../../../../public/animations/Contact_Us_itos.json'

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
    // TODO: replace with real API call
    await new Promise((res) => setTimeout(res, 800))
    setStatus('success')
    setLoading(false)
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
              <p className='text-primary text-xl font-medium py-8'>
                {t('form.successMessage')}
              </p>
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
