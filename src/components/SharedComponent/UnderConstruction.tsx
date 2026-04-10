'use client'

import Lottie from 'lottie-react'
import catAnimation from '@/animations/Cat_playing_animation.json'

interface UnderConstructionProps {
  title?: string
  message?: string
}

const UnderConstruction = ({
  title = 'Coming Soon',
  message = 'We\'re working hard to bring you something great. Check back soon!',
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
      <h1 className="mt-6 text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100">
        {title}
      </h1>
      <p className="mt-4 max-w-md text-base md:text-lg text-gray-500 dark:text-gray-400">
        {message}
      </p>
    </section>
  )
}

export default UnderConstruction
