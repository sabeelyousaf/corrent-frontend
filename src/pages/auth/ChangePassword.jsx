import React from 'react'
import PhoneInput from 'react-phone-input-2'

// import 'react-phone-input-2/lib/material.css'
import CountrySelect from '../../components/CountrySelect'
import LogoAccent from '../../components/LogoAccent'

const ChangePassword = () => {
    return (
        <section className='w-full h-screen flex items-center gap-8 p-8'>
            <div className="flex-1 max-w-[500px] h-full relative flex flex-col justify-center">
                <LogoAccent />

                <form action="">
                    <div className='mb-4'>
                        <h2 className='text-2xl font-semibold text-accent_blue_dark'>Change Your Password</h2>
                        <p className='text-sm text-zinc-600'>Enter Your Registered Email.</p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="">
                            <span className='text-sm font-medium text-primary_text inline-block mb-1'>Password</span>
                            <input type="password" placeholder='Enter Your Password' />
                        </label>

                        <label htmlFor="">
                            <span className='text-sm font-medium text-primary_text inline-block mb-1'>Confirm Password</span>
                            <input type="password" placeholder='Confirm Your Password' />
                        </label>
                        <button className='w-full btn'>Submit</button>
                    </div>

                </form>
            </div>
            <div className="flex-1 h-full bg-red-50 rounded-lg overflow-hidden">
                <img className='w-full h-full object-center object-cover' src="https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />

            </div>
        </section>
    )
}

export default ChangePassword;
