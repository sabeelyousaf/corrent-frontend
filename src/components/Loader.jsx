import React from 'react'
import Lottie from 'lottie-react'
import loading from "../assets/loading.json";
const Loader = () => {
    return (
        <section className='w-full h-screen fixed top-0 left-0 bg-accent_red flex items-center justify-center'>
            <div className='w-[136px] h-[136px]'>
                <Lottie animationData={loading} loop={true} />
            </div>
        </section>
    )
}

export default Loader
