import React from 'react'
import { Link } from 'react-router-dom'
import ResourceCard from '../../components/property_owner/resources/ResourceCard'

const PropertyOwnerResources = () => {
    return (
        <section className='w-full'>
            <h2 className='text-2xl font-semibold'>Property Scores</h2>

            <div className='grid grid-cols-4 gap-4 mt-4'>
                <ResourceCard btnText={"Calculate Earnings"} title={"Compare Properties"} description={"Calculate your earnings break down difference between income and costs"} />
                <ResourceCard btnText={"Explore Maps"} title={"Where to buy next?"} description={"Calculate your earnings break down difference between income and costs"} />
                <ResourceCard btnText={"Read Guidelines"} title={"Requirement"} description={"Calculate your earnings break down difference between income and costs"} />
            </div>
        </section>
    )
}

export default PropertyOwnerResources
