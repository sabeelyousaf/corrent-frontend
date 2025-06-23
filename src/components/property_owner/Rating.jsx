import React from 'react'
import { assets } from '../../../constants'

const Rating = () => {
    return (
        <div className='w-full p-4 bg-zinc-100 rounded-lg mt-4'>
            <span className='text-xs font-medium text-zinc-600'>Submitted on 10/01/2025</span>

            <div className='flex items-center justify-between'>
                <div className='mt-4 flex flex-col gap-4'>
                    <div className='flex items-center gap-2'>
                        <img className='w-[40px] h-[40px] rounded-full' src={assets.placeholder} alt="" />
                        <p className='text-sm font-medium text-zinc-700'>Agent Bumi</p>
                    </div>

                    <div className='flex items-center gap-2'>
                        <img className='w-[40px] h-[40px] rounded-full' src={assets.placeholder} alt="" />
                        <p className='text-sm font-medium text-zinc-700'>Northridge Parkway</p>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <div>
                        <span className='text-sm font-medium text-zinc-700'>Satisfied</span>
                        <p className='text-lg font-semibold'>4.0</p>
                    </div>
                    <img className='w-[72px] h-[72px] rounded-lg' src={assets.like} alt="" />

                </div>
            </div>
        </div>
    )
}

export default Rating
