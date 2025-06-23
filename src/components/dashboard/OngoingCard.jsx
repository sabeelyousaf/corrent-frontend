import React from 'react'
import { assets } from '../../../constants'
import { FaCalendarAlt, FaPhoneAlt } from 'react-icons/fa'

const OngoingCard = () => {
    return (
        <div className='w-full p-2 border border-zinc-300 rounded-lg'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-zinc-500 font-medium'>00012</p>
                <p className='bg-green-400 px-4 py-1 rounded-lg'>
                    <span className='text-xs text-black font-semibold'>In Use</span>
                </p>
            </div>

            <div>
                <h3 className='text-lg font-semibold'>Southpark Road</h3>
                <p className='text-sm text-zinc-500'>B1234ABC</p>
            </div>

            <div className='flex items-center gap-4 mt-2'>
                <div className='flex items-center gap-2'>
                    <img className='w-[36px] h-[36px] rounded-full' src={assets.placeholder} alt="" />
                    <p className='text-xs font-medium text-zinc-600'>Chris</p>
                </div>

                <div className='flex-1 flex items-center gap-2'>
                    <FaPhoneAlt className='text-accent_blue' />
                    <p className='text-xs font-medium text-zinc-600'>0812345678</p>
                </div>

                <div className='flex items-center gap-2'>
                    <FaCalendarAlt className='text-accent_blue' />
                    <p className='text-xs font-medium text-zinc-600'>11 Jan 2021</p>
                </div>

            </div>
        </div>
    )
}

export default OngoingCard
