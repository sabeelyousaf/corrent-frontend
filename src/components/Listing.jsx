import React from 'react';
import {Link} from 'react-router-dom';

const Listing = ({id, image, title, listings}) => {
  return (
    <div className="flex flex-col items-center">
      <Link to={`/property?country=${title}`}>
        <img
          className="w-[120px] h-[120px] rounded-full object-center object-cover mb-2"
          src="https://www.shutterstock.com/image-photo/4k-image-capturing-majestic-burj-600nw-2594598555.jpg"
          alt=""
        />
      </Link>
      <Link to={`/listings/${id}`}>
        <h3 className="font-semibold">{title}</h3>
      </Link>
      <span className="text-xs">{listings} Listings</span>
    </div>
  );
};

export default Listing;
