import React, { useState } from 'react'
import ToggleSwitch from './ToggleSwitch'
import { assets } from '../../../../constants';
import { Link } from 'react-router-dom';

const BookSettings = () => {
    const [enhancedMemberSetting, setEnhancedMemberSetting] = useState(false);
    const [bookingApproval, setBookingApproval] = useState(false);
    return (
        <section className='w-full'>
            <h2 className='text-xl font-semibold'>Booking Settings</h2>

            <div className='mt-4 flex flex-col gap-2'>
                <div className='w-full bg-white p-4 rounded-lg'>

                    <div className='flex items-center justify-between mb-4'>
                        <h3 className='text-lg font-medium'>Enhance Member Setting</h3>
                        <ToggleSwitch label="" value={enhancedMemberSetting} onChange={setEnhancedMemberSetting} />
                    </div>

                    <p className='text-sm text-zinc-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dolorem quidem non possimus labore nisi, quisquam impedit facere, omnis reprehenderit asperiores culpa est provident accusantium voluptatum sequi molestiae unde autem sunt placeat. Nobis excepturi assumenda ipsum omnis repudiandae, corporis provident dolor deleniti explicabo odit consequuntur a nihil impedit doloribus praesentium.</p>

                </div>

                <div className='w-full bg-white p-4 rounded-lg'>

                    <div className='flex items-center justify-between mb-4'>
                        <h3 className='text-lg font-medium'>Booking Approvals</h3>
                        <ToggleSwitch label="" value={bookingApproval} onChange={setBookingApproval} />
                    </div>

                    <p className='text-sm text-zinc-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque dolorem quidem non possimus labore nisi, quisquam impedit facere, omnis reprehenderit asperiores culpa est provident accusantium voluptatum sequi molestiae unde autem sunt placeat. Nobis excepturi assumenda ipsum omnis repudiandae, corporis provident dolor deleniti explicabo odit consequuntur a nihil impedit doloribus praesentium.</p>

                </div>
            </div>

            <div className='mt-4'>
                <h2 className='text-xl font-semibold'>Booking Settings Per Property</h2>

                <div className='mt-2'>
                    <div className='w-full h-[150px] bg-white rounded-lg p-4 flex items-center justify-between'>
                        <div className='h-full flex items-center gap-4'>
                            <img src={assets.placeholder} alt="" className='w-[200px] h-full rounded-lg object-cover object-center ' />

                            <div>
                                <h3 className='text-lg font-semibold'>Northridge Parkway</h3>
                                <div className='flex items-center gap-4 mt-2'>
                                    <button className='text-sm p-3 rounded border border-zinc-300 text-zinc-700 font-medium'>Enhanced Member Screening</button>
                                    <button className='text-sm p-3 rounded border border-zinc-300 text-zinc-700 font-medium'>Booking Approvals</button>
                                </div>
                            </div>
                        </div>

                        <Link className='text-accent_blue/80 font-medium underline text-sm'>Property Settings</Link>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default BookSettings
