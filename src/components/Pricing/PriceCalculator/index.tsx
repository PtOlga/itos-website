'use client'

import { useState } from 'react'
import { projectTypes, calculatorOptions, categoryNames } from './options'
import type { ProjectType, CalculatorOption } from './options'
import { useTranslations } from 'next-intl'

const PriceCalculator = () => {
  const t = useTranslations('pricing')
  const [selectedProject, setSelectedProject] = useState<ProjectType['id']>('landing')
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set())
  const [showOrderForm, setShowOrderForm] = useState(false)
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
    const basePrice = projectTypes.find((p) => p.id === selectedProject)?.basePrice || 0
    const optionsPrice = Array.from(selectedOptions).reduce((sum, optionId) => {
      const option = calculatorOptions.find((o) => o.id === optionId)
      return sum + (option?.price || 0)
    }, 0)
    return basePrice + optionsPrice
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь можно добавить отправку формы на сервер
    console.log('Order submitted:', {
      ...formData,
      projectType: selectedProject,
      selectedOptions: Array.from(selectedOptions),
      total: calculateTotal(),
    })
    alert('Order submitted! Check console for details.')
  }

  const getOptionsByCategory = (category: CalculatorOption['category']) => {
    return calculatorOptions.filter((option) => option.category === category)
  }

  const shouldShowCategory = (category: CalculatorOption['category']) => {
    if (category === 'store') {
      return selectedProject === 'store'
    }
    return true
  }

  return (
    <section className="py-20 dark:bg-darkmode">
      <div className="container">
        {/* Steps */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8 mb-16">
          <div
            className="text-center"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              1
            </div>
            <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">
              Check domain
            </h3>
            <p className="text-SlateBlue dark:text-darktext">
              Check domain for availability
            </p>
          </div>

          <div
            className="text-center"
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="1000"
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              2
            </div>
            <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">
              Template selection
            </h3>
            <p className="text-SlateBlue dark:text-darktext">
              Select template in "design" section or any other
            </p>
          </div>

          <div
            className="text-center"
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-duration="1000"
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
              3
            </div>
            <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">
              Options selection
            </h3>
            <p className="text-SlateBlue dark:text-darktext">
              Select necessary CMS options in calculator below
            </p>
          </div>
        </div>

        {/* Calculator */}
        <div
          className="bg-white dark:bg-darklight rounded-2xl shadow-lg p-8"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          <h2 className="text-3xl font-bold text-secondary dark:text-white mb-8 text-center">
            Cost calculator
          </h2>

          {/* Project Type Selection */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-secondary dark:text-white mb-4">
              Website type
            </h3>
            <div className="space-y-3">
              {projectTypes.map((project) => (
                <label
                  key={project.id}
                  className="flex items-center gap-3 cursor-pointer p-4 rounded-lg border border-BorderLine dark:border-dark_border hover:bg-AliceBlue dark:hover:bg-darkmode transition-colors"
                >
                  <input
                    type="radio"
                    name="projectType"
                    value={project.id}
                    checked={selectedProject === project.id}
                    onChange={(e) => setSelectedProject(e.target.value as ProjectType['id'])}
                    className="w-5 h-5 text-primary"
                  />
                  <span className="text-base text-secondary dark:text-white flex-1">
                    {project.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Options by Category */}
          {Object.entries(categoryNames).map(([category, categoryName]) => {
            if (!shouldShowCategory(category as CalculatorOption['category'])) {
              return null
            }

            const options = getOptionsByCategory(category as CalculatorOption['category'])

            return (
              <div key={category} className="mb-8">
                <h3 className="text-xl font-bold text-secondary dark:text-white mb-4">
                  {categoryName}
                </h3>
                <div className="space-y-3">
                  {options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-3 cursor-pointer p-4 rounded-lg border border-BorderLine dark:border-dark_border hover:bg-AliceBlue dark:hover:bg-darkmode transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedOptions.has(option.id)}
                        onChange={() => handleOptionToggle(option.id)}
                        className="w-5 h-5 text-primary rounded"
                      />
                      <span className="text-base text-secondary dark:text-white flex-1">
                        {option.name}
                      </span>
                      <span className="text-base font-bold text-primary">
                        €{option.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )
          })}

          {/* Total and Calculate Button */}
          <div className="border-t border-BorderLine dark:border-dark_border pt-8 mt-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-2xl font-bold text-secondary dark:text-white">
                Total:
              </span>
              <span className="text-4xl font-bold text-primary">
                €{calculateTotal()}
              </span>
            </div>

            {!showOrderForm && (
              <button
                onClick={() => setShowOrderForm(true)}
                className="w-full btn py-4 rounded-lg text-lg font-semibold"
              >
                Calculate & Order
              </button>
            )}
          </div>

          {/* Order Form */}
          {showOrderForm && (
            <div className="border-t border-BorderLine dark:border-dark_border pt-8 mt-8">
              <h3 className="text-2xl font-bold text-secondary dark:text-white mb-4">
                Order placement
              </h3>
              <p className="text-SlateBlue dark:text-darktext mb-6">
                Fill in all required fields (*) and click "Order"
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-base font-medium text-secondary dark:text-white mb-2">
                    * Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-BorderLine dark:border-dark_border bg-white dark:bg-darkmode text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-secondary dark:text-white mb-2">
                    * Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-BorderLine dark:border-dark_border bg-white dark:bg-darkmode text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-secondary dark:text-white mb-2">
                    * Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-BorderLine dark:border-dark_border bg-white dark:bg-darkmode text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-secondary dark:text-white mb-2">
                    Future domain:
                  </label>
                  <input
                    type="text"
                    name="domain"
                    value={formData.domain}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 rounded-lg border border-BorderLine dark:border-dark_border bg-white dark:bg-darkmode text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-secondary dark:text-white mb-2">
                    Design URL/№:
                  </label>
                  <input
                    type="text"
                    name="design"
                    value={formData.design}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 rounded-lg border border-BorderLine dark:border-dark_border bg-white dark:bg-darkmode text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-secondary dark:text-white mb-2">
                    Notes:
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleFormChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-BorderLine dark:border-dark_border bg-white dark:bg-darkmode text-secondary dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn py-4 rounded-lg text-lg font-semibold"
                >
                  Order
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
