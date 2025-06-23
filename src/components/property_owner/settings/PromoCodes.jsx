import React from 'react'

const PromoCodes = () => {
    return (
        <section className='w-full'>

            <form action="" className='flex items-center gap-2'>
                <label htmlFor="" className='flex items-center gap-4'>
                    <span>Promo Codes</span>
                    <input className='!bg-white !w-[200px] !p-2' type="text" />
                </label>

                <button className='text-sm bg-accent_blue p-2 w-[100px] text-white rounded'>Apply</button>
            </form>

            <div className='mt-4'>
                <h3 className='mb-2 text-lg font-semibold'>Applied Promotions</h3>
                <textarea name="" id="" className='w-full bg-white h-[200px] rounded-lg resize-none p-4'></textarea>
            </div>
        </section>
    )
}

export default PromoCodes
