import React, {useState, useEffect} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {AiFillHome} from 'react-icons/ai';
import {IoBedSharp} from 'react-icons/io5';
import {FaBath, FaCar} from 'react-icons/fa6';
import Overview from '../../components/property_owner/manage/Overview';
import HouseManual from '../../components/property_owner/manage/HouseManual';
import Earnings from '../../components/property_owner/manage/Earnings';
import Vehicles from '../../components/property_owner/manage/Vehicles';
import Promotions from '../../components/property_owner/manage/Promotions';
import {propertyApi} from '../../api/property';
import {toast} from 'react-hot-toast';
import Setting from '../../components/property_owner/manage/Setting';

const PropertyDetails = () => {
  const {id} = useParams ();
  const navigate = useNavigate ();
  const [filter, setFilter] = useState ('overview');
  const [property, setProperty] = useState (null);
  const [loading, setLoading] = useState (true);

  // Fetch property details
  useEffect (
    () => {
      const fetchProperty = async () => {
        try {
          setLoading (true);
          const res = await propertyApi.get (id);
          setProperty (res.property);
        } catch (error) {
          console.error ('Error fetching property:', error);
          toast.error ('Failed to load property details');
        } finally {
          setLoading (false);
        }
      };

      if (id) fetchProperty ();
    },
    [id]
  );

  if (loading) {
    return (
      <div className="w-full p-8 text-center">Loading property details...</div>
    );
  }

  if (!property) {
    return (
      <div className="w-full p-8 text-center">
        <p>Property not found</p>
        <button
          onClick={() => navigate ('/property-owner/manage')}
          className="mt-4 btn bg-blue-600 text-white"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  // Calculate totals
  const totalBeds = property.rooms.reduce ((sum, room) => {
    return (
      sum +
      (room.bedroom.singleBed ? 1 : 0) +
      (room.bedroom.twinBed ? 2 : 0) +
      (room.bedroom.doubleBed ? 1 : 0)
    );
  }, 0);

  const totalBaths = property.bathrooms.length;
  const totalCars = property.livingRoom.freeParking ? 1 : 0; // Adjust based on your data

  return (
    <section className="w-full">
      {/* Property Header */}
      <div className="w-full p-4 bg-white rounded-lg mb-4 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap mb-2 md:mb-0">
          <p className="text-lg font-semibold">{property.title}</p>
          <span className="w-[3px] h-8 bg-accent_red hidden md:block" />
          <p className="text-lg font-semibold">{property.location.address}</p>

          {property.status === 'available' &&
            <p className="bg-green-600 w-fit px-2 py-1 rounded ml-2">
              <span className="text-sm text-white font-medium">Available</span>
            </p>}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Link
            to={`/property-owner/add-room/${property._id}`}
            className="btn !text-sm"
          >
            Add Room
          </Link>

          <div className="ml-0 md:ml-8 flex items-center gap-3 md:gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span>
                <AiFillHome className="text-lg text-accent_red" />
              </span>
              <span className="text-sm text-zinc-600 font-medium capitalize">
                {property.type || 'Property'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>
                <IoBedSharp className="text-lg text-accent_red" />
              </span>
              <span className="text-sm text-zinc-600 font-medium">
                {totalBeds} Beds
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>
                <FaBath className="text-lg text-accent_red" />
              </span>
              <span className="text-sm text-zinc-600 font-medium">
                {totalBaths} Baths
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>
                <FaCar className="text-lg text-accent_red" />
              </span>
              <span className="text-sm text-zinc-600 font-medium">
                {totalCars} Cars
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="w-full grid grid-cols-3 md:grid-cols-6 gap-2 mb-4">
        {[
          {label: 'Overview', value: 'overview'},
          {label: 'House Manual', value: 'house_manual'},
          {label: 'Earnings', value: 'earnings'},
          {label: 'Vehicles', value: 'vehicles'},
          {label: 'Promotions', value: 'promotions'},
          {label: 'CCTV', value: 'settings'},
        ].map ((tab, index) => (
          <button
            className={`${filter === tab.value ? 'text-white bg-accent_red' : 'text-zinc-600 bg-white'} cursor-pointer p-3 text-xs md:text-sm rounded-lg font-medium`}
            onClick={() => setFilter (tab.value)}
            key={index}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {filter === 'overview'
        ? <Overview property={property} />
        : filter === 'house_manual'
            ? <HouseManual property={property} />
            : filter === 'earnings'
                ? <Earnings property={property} />
                : filter === 'vehicles'
                    ? <Vehicles property={property} />
                    : filter === 'promotions'
                        ? <Promotions property={property} />
                        : filter === 'settings' ? <Setting /> : null}
    </section>
  );
};

export default PropertyDetails;
