import React from 'react'
import { assets } from '../../../../constants'
import { Link } from 'react-router-dom'

const ResourceCard = ({ image, title, description, id, btnText}) => {
    return (
        <div className='w-full bg-white p-4 rounded-lg flex flex-col'>
            <img src={image || assets.placeholder} alt="" className="mb-2 w-full h-[250px] rounded-lg object-center object-cover" />
            <h3 className='text-xl font-semibold'>{title}</h3>
            <p className='text-sm text-zinc-700'>{description}</p>
            <Link to={`/property_owner/resources/${id}`} className='bg-accent_blue text-white p-4 mt-2 text-sm font-medium text-center rounded'>{btnText}</Link>
        </div>
    )
}

export default ResourceCard
