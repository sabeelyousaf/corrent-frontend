import React from 'react';
import {IoStorefrontOutline} from 'react-icons/io5';
import {MdVerified} from 'react-icons/md';
import {Link} from 'react-router-dom';

const Property = ({
  id,
  slug,
  image,
  title,
  price,
  address,
  billsIncluded = true,
  isVerified = true,
}) => {
  return (
    <div className="w-full border border-zinc-300 rounded-lg p-3 flex flex-col gap-4">
      <Link to={`/property/${slug}`}>
        <img
          className="h-[200px] w-full rounded-lg object-center items-center"
          src={image}
          alt={title}
        />
      </Link>

      <div className="flex items-center justify-between">
        <Link to={`/property/${id}`}>
          <h3 className="text-sm font-medium">{title}</h3>
        </Link>
        <small className="text-sm">
          <b>{price}$</b>/Month
        </small>
      </div>

      <p className="text-sm text-zinc-600">{address}</p>

      <div className="flex items-center gap-2">
        {billsIncluded &&
          <div className="flex items-center gap-2 bg-zinc-200 !w-fit px-4 py-2 rounded-full">
            <IoStorefrontOutline className="text-sm" />
            <small className="text-[8px]">Bills Included</small>
          </div>}

        {isVerified &&
          <div className="flex items-center gap-2 bg-zinc-200 !w-fit px-4 py-2 rounded-full">
            <MdVerified className="text-sm" />
            <small className="text-[8px]">ELL Verified</small>
          </div>}
      </div>
    </div>
  );
};

export default Property;
