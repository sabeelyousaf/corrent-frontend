import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const Seller = ({ id, image, name, designation }) => {
    return (
        <div className='w-[350px] bg-white rounded-lg'>
            <img className='w-full h-[200px] object-center object-cover rounded-t-lg' src={image} alt="" />
            <div className='w-full p-4'>
                <h3 className='text-lg font-semibold'>{name}</h3>
                <span className='text-sm  text-zinc-700'>{designation}</span>

                <Link to={`/seller/${id}`} className='flex items-center gap-2 text-yellow-600 font-medium mt-2'>
                    <span>Contact seller</span>
                    <span><FaArrowRightLong /></span>
                </Link>
            </div>
        </div>
    )
}

export default Seller
