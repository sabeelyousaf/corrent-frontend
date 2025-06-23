import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Seller from '../../components/Seller';
import { assets } from '../../../constants';
const Sellers = () => {
    return (
        <section className='w-full h-[80vh]'>
            <div className="grid grid-cols-2 h-full bg-accent_red_dark">
                <div className='w-full h-full overflow-hidden'>
                    <img className='w-full h-full object-center object-cover' src={assets.bg_2}alt="" />
                </div>

                <div className='w-full flex flex-col items-center justify-center gap-10'>
                    <div className='p-16'>
                        <h2 className="primary_heading !text-white"> Explore Your Dream Home or Boost Your Investment Portfolio Today - Your Future Awaits!</h2>
                        <p className='text-white/80'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed tristique metus proin id lorem odio</p>
                    </div>

                    <div className='w-full overflow-x-hidden pl-16'>
                        <div className="sellers min-w-[200vw] flex whitespace-nowrap gap-4">
                            <Seller image={"https://picsum.photos/1000/1000"} name={"Darlene Robertson"} designation={"Realtor"} />
                            <Seller image={"https://picsum.photos/1000/1000"} name={"Darlene Robertson"} designation={"Realtor"} />
                            <Seller image={"https://picsum.photos/1000/1000"} name={"Darlene Robertson"} designation={"Realtor"} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Sellers
