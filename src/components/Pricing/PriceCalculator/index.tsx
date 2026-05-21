'use client'

import { useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { projectTypes, calculatorOptions } from './options'
import type { ProjectType, CalculatorOption } from './options'

const categoryOrder: CalculatorOption['category'][] = ['main', 'communication', 'seo', 'additional', 'store']

const optionTranslationKey: Record<string, string> = {
  news: 'news',
  catalog: 'catalog',
  search: 'search',
  gallery: 'gallery',
  articles: 'articles',
  map: 'map',
  faq: 'faq',
  reviews: 'reviews',
  sitemap: 'sitemap',
  microformats: 'microformats',
  rss: 'rss',
  'auto-import': 'autoImport',
  ads: 'ads',
  'excel-import': 'excelImport',
  multilang: 'multilang',
  'product-variants': 'productVariants',
  'product-search': 'productSearch',
  'alphabetical-search': 'alphabeticalSearch',
}

const PriceCalculator = () => {
  const t = useTranslations('pricing')
  const locale = useLocale()
  const isSEK = locale === 'sv'

  const [selectedProject, setSelectedProject] = useState<ProjectType['id']>('landing')
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set())
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    domain: '',
    design: '',
    notes: '',
  })

  const handleOptionToggle = (optionId: string) => {
    const newSelected = new Set(selectedOptions)
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId)
    } else {
      newSelected.add(optionId)
    }
    setSelectedOptions(newSelected)
  }

  const calculateTotal = () => {
    const project = projectTypes.find((p) => p.id === selectedProject)
    const basePrice = isSEK ? (project?.basePriceSEK || 0) : (project?.basePrice || 0)
    const optionsPrice = Array.from(selectedOptions).reduce((sum, optionId) => {
      const option = calculatorOptions.find((o) => o.id === optionId)
      return sum + (isSEK ? (option?.priceSEK || 0) : (option?.price || 0))
    }, 0)
    return basePrice + optionsPrice
  }

  const formatPrice = (amount: number) => {
    return isSEK ? `${amount.toLocaleString('sv-SE')} kr` : `€${amount}`
  }

  const getOptionPrice = (option: CalculatorOption) => {
    return isSEK ? option.priceSEK : option.price
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: calculateTotal(),
          currency: isSEK ? 'sek' : 'eur',
          customerName: formData.name,
          customerEmail: formData.email,
          projectType: selectedProject,
          selectedOptions: Array.from(selectedOptions),
          notes: formData.notes,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t('errors.checkout'))
      }

      if (data.url) {
        window.location.href = data.url
      } else {
        alert(t('errors.checkout'))
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert(t('errors.checkout'))
    } finally {
      setIsLoading(false)
    }
  }

  const getOptionsByCategory = (category: CalculatorOption['category']) => {
    return calculatorOptions.filter((option) => {
      if (option.category !== category) return false
      return getOptionPrice(option) > 0
    })
  }

  const shouldShowCategory = (category: CalculatorOption['category']) => {
    if (category === 'store') return selectedProject === 'store'
    return true
  }

  return (
    <section className="py-20 dark:bg-darkmode">
      <div className="container">
        {/* Steps */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 mb-16">
          <div className="text-center" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">1</div>
            <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">{t('steps.step1Title')}</h3>
            <p className="text-SlateBlue dark:text-darktext">{t('steps.step1Desc')}</p>
          </div>
          <div className="text-center" data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">2</div>
            <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">{t('steps.step2Title')}</h3>
            <p className="text-SlateBlue dark:text-darktext">{t('steps.step2Desc')}</p>
          </div>
          <div className="text-center" data-aos="fade-up" data-aos-delay="600" data-aos-duration="1000">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">3</div>
            <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">{t('steps.step3Title')}</h3>
            <p className="text-SlateBlue dark:text-darktext">{t('steps.step3Desc')}</p>
          </div>
        </div>

        {/* Calculator */}
        <div className="bg-white dark:bg-darklight rounded-2xl shadow-lg p-8" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
          <h2 className="text-3xl font-bold text-secondary dark:text-white mb-8 text-center">{t('calculator.title')}</h2>

          {/* Project Type */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-secondary dark:text-white mb-4">{t('calculator.websiteType')}</h3>
            <div className="space-y-3">
              {projectTypes.map((project) => (
                <label key={project.id} className="flex items-center gap-3 cursor-pointer p-4 rounded-lg border border-BorderLine dark:border-dark_border hover:bg-AliceBlue dark:hover:bg-darkmode transition-colors">
                  <input
                    type="radio"
                    name="projectType"
                    value={project.id}
                    checked={selectedProject === project.id}
                    onChange={(e) => setSelectedProject(e.target.value as ProjectType['id'])}
                    className="w-5 h-5 text-primary"
                  />
                  <span className="text-base text-secondary dark:text-white flex-1">{t(`websiteTypes.${project.id}`)}</span>
                  <span className="text-base font-bold text-primary">
                    {formatPrice(isSEK ? project.basePriceSEK : project.basePrice)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Options by Category */}
          {categoryOrder.map((category) => {
            if (!shouldShowCategory(category)) return null
            const options = getOptionsByCategory(category)
            return (
              <div key={category} className="mb-8">
                <h3 className="text-xl font-bold text-secondary dark:text-white mb-4">{t(`categories.${category}`)}</h3>
                <div className="space-y-3">
                  {options.map((option) => (
                    <label key={option.id} className="flex items-center gap-3 cursor-pointer p-4 rounded-lg border border-BorderLine dark:border-dark_border hover:bg-AliceBlue dark:hover:bg-darkmode transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedOptions.has(option.id)}
                        onChange={() => handleOptionToggle(option.id)}
                        className="w-5 h-5 text-primary rounded"
                      />
                      <span className="text-base text-secondary dark:text-white flex-1">{t(`options.${optionTranslationKey[option.id]}`)}</span>
                      {getOptionPrice(option) > 0 ? (
                        <span className="text-base font-bold text-primary">
                          {formatPrice(getOptionPrice(option))}
                        </span>
                      ) : null}
                    </label>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Total */}
          <div className="border-t border-BorderLine dark:border-dark_border pt-8 mt-8">
            <p className="mb-4 text-sm leading-6 text-SlateBlue dark:text-darktext md:text-base">
              {t('calculator.additionalHoursNote')}
            </p>
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold text-secondary dark:text-white">{t('calculator.total')}:</span>
              <span className="text-4xl font-bold text-primary">{formatPrice(calculateTotal())}</span>
            </div>
            {!showOrderForm && (
              <button onClick={() => setShowOrderForm(true)} className="w-full btn py-4 rounded-lg text-lg font-semibold">
                {t('calculator.calculateOrder')}
              </button>
            )}
          </div>

          {/* Order Form */}
          {showOrderForm && (
            <div className="border-t border-BorderLine dark:border-dark_border pt-8 mt-8">
              <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4">{t('orderForm.title')}</h3>
              <p className="text-SlateBlue dark:text-darktext mb-6">{t('orderForm.description')}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-base font-medium text-secondary dark:text-white mb-2">* {t('orderForm.name')}</label>
                  <input type="text" name="name" value={formData.name} onChange={handleFormChange} required
                    className="w-full px-4 py-3 rounded-lg border border-BorderLine dark:border-dark_border bg-white dark:bg-darkmode text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-base font-medium text-secondary dark:text-white mb-2">* {t('orderForm.email')}</label>
                  <input type="email" name="email" value={formData.email} onChange={handleFormChange} required
                    className="w-full px-4 py-3 rounded-lg border border-BorderLine dark:border-dark_border bg-white dark:bg-darkmode text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-base font-medium text-secondary dark:text-white mb-2">* {t('orderForm.phone')}</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required
                    className="w-full px-4 py-3 rounded-lg border border-BorderLine dark:border-dark_border bg-white dark:bg-darkmode text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-base font-medium text-secondary dark:text-white mb-2">{t('orderForm.domain')}</label>
                  <input type="text" name="domain" value={formData.domain} onChange={handleFormChange}
                    className="w-full px-4 py-3 rounded-lg border border-BorderLine dark:border-dark_border bg-white dark:bg-darkmode text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-base font-medium text-secondary dark:text-white mb-2">{t('orderForm.design')}</label>
                  <input type="text" name="design" value={formData.design} onChange={handleFormChange}
                    className="w-full px-4 py-3 rounded-lg border border-BorderLine dark:border-dark_border bg-white dark:bg-darkmode text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="block text-base font-medium text-secondary dark:text-white mb-2">{t('orderForm.notes')}</label>
                  <textarea name="notes" value={formData.notes} onChange={handleFormChange} rows={4} maxLength={500}
                    className="w-full px-4 py-3 rounded-lg border border-BorderLine dark:border-dark_border bg-white dark:bg-darkmode text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <button type="submit" disabled={isLoading} className="w-full btn py-4 rounded-lg text-lg font-semibold disabled:opacity-50">
                  {isLoading ? t('orderForm.processing') : t('orderForm.submit')}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default PriceCalculator