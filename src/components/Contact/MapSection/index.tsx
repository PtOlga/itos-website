'use client'

import React from 'react'

const MAP_QUERY = 'Charlottenberg,Sweden'
const MAP_ZOOM = 11

const MapSection = () => {
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=${MAP_ZOOM}&hl=sv&output=embed`

  return (
    <section className='dark:bg-darkmode pb-10'>
      <div className='container'>
        <iframe
          src={src}
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
