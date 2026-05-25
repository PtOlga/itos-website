'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Calculator, ChevronDown, Sparkles } from 'lucide-react'
import PriceCalculator from './PriceCalculator'

const CollapsibleCalculator = () => {
  const t = useTranslations('pricing')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="py-6 dark:bg-darkmode">
      <div className="container">
        {/* Toggle trigger */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border-2 border-[#F07B2A]/35 bg-gradient-to-r from-[#FFF4EA] via-white to-[#FFF9F4] px-5 py-4 text-left shadow-[0_12px_30px_rgba(240,123,42,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F07B2A]/60 hover:shadow-[0_18px_40px_rgba(240,123,42,0.18)] dark:border-[#F07B2A]/25 dark:from-darklight dark:via-darklight dark:to-darkmode dark:hover:border-[#F07B2A]/50"
        >
          <div className="pointer-events-none absolute -right-10 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full bg-[#F07B2A]/15 blur-3xl transition-opacity duration-300 group-hover:opacity-100 dark:bg-[#F07B2A]/10" />

          <div className="relative z-[1] flex min-w-0 items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F07B2A] text-white shadow-[0_10px_24px_rgba(240,123,42,0.28)]">
              <Calculator className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <span className="block text-base font-semibold text-secondary transition-colors duration-300 group-hover:text-[#C85E10] dark:text-white dark:group-hover:text-[#FFB16D] md:text-lg">
                {t('calculatorToggle')}
              </span>
              <span className="mt-1 flex items-center gap-2 text-sm text-[#C85E10] dark:text-[#FFB16D]">
                <Sparkles className="h-4 w-4" />
                <span className="font-medium">{t('calculatorToggleHint')}</span>
              </span>
            </div>
          </div>

          <div className="relative z-[1] ml-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#F07B2A]/25 bg-white/80 text-[#F07B2A] transition-colors duration-300 group-hover:bg-[#F07B2A] group-hover:text-white dark:bg-darklight/80 dark:group-hover:bg-[#F07B2A]">
            <ChevronDown
              className={`h-5 w-5 transition-transform duration-300 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </div>
        </button>

        {/* Collapsible body — CSS max-height transition */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'mt-4 max-h-[6000px] opacity-100' : 'mt-0 max-h-0 opacity-0'
          }`}
        >
          <PriceCalculator hideSteps />
        </div>
      </div>
    </div>
  )
}

export default CollapsibleCalculator
