import React from 'react'

const PropertyEarningStats = ({ icon, title, amount, growth }) => {
    return (
        <div className='bg-white p-4 rounded-lg flex items-center gap-4'>
            <div className='w-[64px] h-[64px] rounded-full bg-accent_blue/20 flex items-center justify-center'>
                {icon}
            </div>

            <div>
                <span className='text-accent_blue/80 font-medium text-sm'>{title}</span>
                <p className='text-2xl font-semibold'>${amount}</p>
                <p className='text-zinc-700 text-sm font-medium'><span className='text-accent_red font-semibold'>{growth}%</span> this month</p>
            </div>
        </div>
    )
}

export default PropertyEarningStats
