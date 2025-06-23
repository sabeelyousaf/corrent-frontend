import React from 'react'
import Select from 'react-select'
import { styles } from '../../select/style'

const Listing = () => {
  return (
    <section className='w-full flex flex-col gap-4'>
      <div className='w-full flex justify-between items-center'>
        <h2 className='text-xl font-semibold'>Listings</h2>

        <div className='flex items-center gap-4'>
          <span className='text-sm'>Select Property</span>
          <Select className='!min-w-[300px]' styles={styles} />
        </div>
      </div>

      <div className='w-full rounded-lg bg-white p-4'>
        <h3 className='text-lg font-semibold'>Rankings</h3>
        <p className='text-sm text-zinc-600'>Ranking is based on members House source reviews.</p>

        <div className='w-full text-center my-2'>
          <span className='text-sm'>The Property Ranking is</span>
          <p className='text-4xl font-semibold'>Very Good</p>
        </div>

        <div className='w-full grid grid-cols-5 gap-2 mt-8'>
          <div className='w-full flex flex-col items-center gap-3'>
            <div className='w-full h-[10px] bg-red-600 rounded-full'></div>
            <span className='text-lg font-medium'>Poor</span>
          </div>

          <div className='w-full flex flex-col items-center gap-3'>
            <div className='w-full h-[10px] bg-orange-600 rounded-full'></div>
            <span className='text-lg font-medium'>Fair</span>
          </div>

          <div className='w-full flex flex-col items-center gap-3'>
            <div className='w-full h-[10px] bg-yellow-500 rounded-full'></div>
            <span className='text-lg font-medium'>Good</span>
          </div>

          <div className='w-full flex flex-col items-center gap-3'>
            <div className='w-full h-[10px] bg-green-500 rounded-full'></div>
            <span className='text-lg font-medium'>Very Good</span>
          </div>

          <div className='w-full flex flex-col items-center gap-3'>
            <div className='w-full h-[10px] bg-green-700 rounded-full'></div>
            <span className='text-lg font-medium'>Exceptional</span>
          </div>
        </div>

        <div className='w-full grid grid-cols-2 gap-4 my-4'>
          <div className='w-full h-[150px] bg-zinc-100 rounded-lg flex flex-col items-center justify-center gap-2 p-4'>
            <span className='text-sm font-medium text-zinc-800'>Your Property’s average is</span>
            <p className='text-3xl font-semibold text-accent_red'>3.8</p>

            <div className='w-full h-[10px] bg-white rounded-full'>
              <div className='w-[75%] h-full bg-accent_blue rounded-lg'></div>
            </div>

            <p className='text-sm text-center'>Your Property’s average is based on 8 members response</p>
          </div>

          <div className='w-full h-[150px] bg-zinc-100 rounded-lg flex flex-col items-center justify-center gap-2 p-4'>
            <span className='text-sm font-medium text-zinc-800'>Metro area average is</span>
            <p className='text-3xl font-semibold text-accent_red'>3.9</p>

            <div className='w-full h-[10px] bg-white rounded-full'>
              <div className='w-[78%] h-full bg-accent_blue rounded-lg'></div>
            </div>

            <p className='text-sm text-center'>The average age property score across all properties in this metro area.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Listing
