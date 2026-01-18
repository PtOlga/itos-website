import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const ContactForm = () => {
  return (
    <>
      <section className='dark:bg-darkmode pt-0 md:pb-24 pb-10'>
        <div className='container'>
          <div className='grid lg:grid-cols-12 grid-cols-1 md:gap-20 gap-10'>
            <div className='md:col-span-6 col-span-1'>
              <h2 className='max-w-277 sm:text-[40px] sm:leading-[3rem] text-[28px] leading-[2.25rem] font-bold text-secondary dark:text-white mb-9'>
                Get Online Consultation
              </h2>
              <form className='flex flex-wrap w-full m-auto justify-between'>
                <div className='sm:flex gap-3 w-full'>
                  <div className='mx-0 my-2.5 flex-1 space-y-2'>
                    <Label htmlFor='first-name'>First Name*</Label>
                    <Input id='first-name' type='text' />
                  </div>
                  <div className='mx-0 my-2.5 flex-1 space-y-2'>
                    <Label htmlFor='last-name'>Last Name*</Label>
                    <Input id='last-name' type='text' />
                  </div>
                </div>
                <div className='sm:flex gap-3 w-full'>
                  <div className='mx-0 my-2.5 flex-1 space-y-2'>
                    <Label htmlFor='email'>Email address*</Label>
                    <Input id='email' type='email' />
                  </div>
                  <div className='mx-0 my-2.5 flex-1 space-y-2'>
                    <Label htmlFor='Specialist'>Specialist*</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder='Choose a specialist' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='baking'>Baking & Pastry</SelectItem>
                        <SelectItem value='exotic'>Exotic Cuisine</SelectItem>
                        <SelectItem value='french'>French Desserts</SelectItem>
                        <SelectItem value='seafood'>Seafood & Wine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className='sm:flex gap-3 w-full'>
                  <div className='mx-0 my-2.5 flex-1 space-y-2'>
                    <Label htmlFor='date'>Date*</Label>
                    <Input id='date' type='date' />
                  </div>
                  <div className='mx-0 my-2.5 flex-1 space-y-2'>
                    <Label htmlFor='time'>Time*</Label>
                    <Input id='time' type='time' />
                  </div>
                </div>
                <div className='mx-0 my-2.5 w-full'>
                  <Button
                    type='submit'
                    className='bg-primary hover:bg-darkprimary mt-4 px-8 py-6'>
                    Make an appointment
                  </Button>
                </div>
              </form>
            </div>
            <div className='sm:col-span-6 col-span-1'>
              <Image
                src='/images/contact/contact.jpg'
                alt='Contact'
                width={0}
                height={0}
                quality={100}
                sizes='100vh'
                className='bg-no-repeat bg-contain rounded-lg w-526 h-650'
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ContactForm
