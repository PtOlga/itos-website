'use client'

import dynamic from 'next/dynamic'
import catAnimation from '../../../public/animations/cat-playing-animation.json'

const Lottie = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => (
    <div className='w-64 h-64 md:w-80 md:h-80 bg-primary/5 rounded-full animate-pulse' />
  ),
})

interface UnderConstructionProps {
  title?: string
  message?: string
}

const UnderConstruction = ({
  title = 'Coming Soon',
  message = 'This page is being prepared. Check back soon!',
}: UnderConstructionProps) => {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
      <div className="w-64 h-64 md:w-80 md:h-80">
        <Lottie
          animationData={catAnimation}
          loop={true}
          autoplay={true}
        />
      </div>
      <h2 className="mt-6 text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
        {title}
      </h2>
      <p className="mt-4 max-w-md text-base md:text-lg text-gray-500 dark:text-gray-400">
        {message}
      </p>
    </section>
  )
}

export default UnderConstruction
