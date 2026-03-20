'use client'

import React from 'react'

const MapSection = () => {
  return (
    <section className='dark:bg-darkmode pb-10'>
      <div className='container'>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.123456789!2d12.2833!3d59.8833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465719b3f1234567%3A0x1234567890abcdef!2sCharlottenberg%2C%20Sweden!5e0!3m2!1sen!2sse!4v1700000000000!5m2!1sen!2sse'
          width='1114'
          height='400'
          loading='lazy'
          referrerPolicy='no-referrer-when-downgrade'
          className='rounded-lg w-full'
        />
      </div>
    </section>
  )
}

export default MapSection
