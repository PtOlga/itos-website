'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
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
          className="w-full flex items-center justify-between px-6 py-4 bg-white dark:bg-darklight rounded-xl border border-BorderLine dark:border-dark_border hover:border-primary dark:hover:border-primary transition-colors text-left group"
        >
          <span className="text-base md:text-lg font-medium text-secondary dark:text-white group-hover:text-primary transition-colors">
            {t('calculatorToggle')}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Collapsible body — CSS max-height transition */}
        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
            isOpen ? 'max-h-[6000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <PriceCalculator hideSteps />
        </div>
      </div>
    </div>
  )
}

export default CollapsibleCalculator
