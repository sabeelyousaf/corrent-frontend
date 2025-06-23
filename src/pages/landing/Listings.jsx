import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Listing from '../../components/Listing'



const Listings = ({countries}) => {

  return (
    <section className="flex items-center justify-center">
      <div className="content_area text-center py-16 px-4">
        <div className='block'>
          <h2 className="text-primary_text font-semibold text-4xl mb-2">
            Explore Our Listings
          </h2>
          <p className="text-secondary_text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus autem voluptate rerum error explicabo
            {' '}
            <br className="hidden md:block" />
            {' '}
            quas accusamus tempore nam dicta architecto.
          </p>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 my-6 py-10">
          {countries.map((val, index) => (
            <Listing
              key={val?.id || index}
              id={val?.id || index}
              image={val?.image}
              title={val?.name}
              listings={val?.listings || 1500}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Listings;
