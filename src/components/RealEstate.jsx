import React, {useState, useEffect} from 'react';
import {CiMap} from 'react-icons/ci';
import {LuBedSingle} from 'react-icons/lu';
import {LiaBathSolid, LiaTapeSolid} from 'react-icons/lia';
import {FaRegBookmark, FaBookmark} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import {roomApi} from '../api/room';
import toast from 'react-hot-toast';

const RealEstate = ({
  id,
  slug,
  image,
  title,
  location,
  price,
  beds,
  baths,
  area,
  posted,
}) => {
  const [isFavorite, setIsFavorite] = useState (false);

  useEffect (() => {
    // Optionally preload favorite status (e.g., from API or props)
    // If you have favorites list from parent or global store, you can check here
  }, []);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await roomApi.removeFav (id);
        setIsFavorite (false);
        toast.success ('Property remove from Favorties successfully');
      } else {
        await roomApi.addToFav (id);
        toast.success ('Property Added to Favorties successfully');
        setIsFavorite (true);
      }
    } catch (error) {
      console.error ('Favorite toggle failed:', error.message);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg p-4 flex flex-col gap-4">
      <div className="relative w-full h-[225px] rounded-lg overflow-hidden">
        <img
          className="w-full h-full object-center object-cover"
          src={image}
          alt=""
        />
        <Link to={`/property/${slug}`}>
          <div className="overlay absolute w-full h-full top-0 left-0 bg-black/30 p-4 flex flex-col">
            <div className="w-full flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="bg-accent_blue px-4 py-2 rounded-full text-xs font-medium text-white">
                  Featured
                </span>
                <span className="bg-[#6E55FF] px-4 py-2 rounded-full text-xs font-medium text-white">
                  For Sale
                </span>
              </div>
              <button
                style={{cursor: 'pointer'}}
                onClick={e => {
                  e.preventDefault (); // prevent Link click
                  toggleFavorite ();
                }}
                className="w-[40px] h-[40px] rounded-full bg-accent_red flex items-center justify-center"
              >
                {isFavorite
                  ? <FaBookmark className="text-white" />
                  : <FaRegBookmark className="text-white" />}
              </button>
            </div>
          </div>
        </Link>
      </div>

      <div className="w-full text-left">
        <Link to={`/property/${id}`}>
          <h3 className="text-lg font-semibold">{title}</h3>
        </Link>
        <p className="flex items-center gap-1 mt-1">
          <CiMap className="text-xl text-zinc-600" />
          <span className="text-zinc-600 text-sm">{location}</span>
        </p>
      </div>

      <h4 className="text-left text-lg font-semibold text-accent_blue">
        ${price}
      </h4>

      <div className="flex items-center gap-3 text-sm">
        <p className="flex items-center gap-1 text-zinc-600">
          <LuBedSingle />
          <span>
            Beds: <b className="font-medium">{beds}</b>
          </span>
        </p>

        <p className="flex items-center gap-1 text-zinc-600">
          <LiaBathSolid />
          <span>
            Baths: <b className="font-medium">{baths}</b>
          </span>
        </p>

        <p className="flex items-center gap-1 text-zinc-600">
          <LiaTapeSolid />
          <span>
            Sqft: <b className="font-medium">{area}</b>
          </span>
        </p>
      </div>

      <hr className="inline-block w-full text-zinc-200" />

      <div className="w-full flex items-center justify-between">
        <button className="flex-1 flex items-center gap-1 cursor-pointer">
          <span className="text-lg font-medium text-accent_blue">+</span>
          <span>Compare</span>
        </button>

        <div className="h-[40px] w-[40px] rounded-full bg-zinc-200" />
        <p className="flex-1 text-right">{posted}</p>
      </div>
    </div>
  );
};

export default RealEstate;
