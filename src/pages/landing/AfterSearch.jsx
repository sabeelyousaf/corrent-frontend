import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Map from '../../components/Map';
import { IoGridOutline } from 'react-icons/io5';
import { BsList } from 'react-icons/bs';
import Property from '../../components/Property';
import Accordion from '../../components/Accordion';
import { roomApi } from '../../api/room';
import { countryApi } from '../../api/country';

const AfterSearch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [filters, setFilters] = useState({
    roomTitle: '',
    roomType: [],
    country: [],
    minPrice: '',
    maxPrice: '',
    amenities: [],
  });

  // Parse URL parameters on load
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const initialFilters = {
      roomTitle: params.get('roomTitle') || '',
      roomType: params.get('roomType') ? params.get('roomType').split(',') : [],
      country: params.get('country') ? params.get('country').split(',') : [],
      minPrice: params.get('min') || '',
      maxPrice: params.get('max') || '',
      amenities: params.get('amenities') ? params.get('amenities').split(',') : [],
    };

    setFilters(initialFilters);
    fetchRooms(initialFilters);
    fetchCountries();
  }, [location.search]);

  const fetchCountries = async () => {
    try {
      const res = await countryApi.list();
      setCountries(res?.countries || []);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchRooms = async (filterParams) => {
    try {
      setLoading(true);
      
      // Prepare API parameters
      const params = {
        roomTitle: filterParams.roomTitle || undefined,
        roomType: filterParams.roomType.join(',') || undefined,
        country: filterParams.country.join(',') || undefined,
        min: filterParams.minPrice ? Number(filterParams.minPrice) : undefined,
        max: filterParams.maxPrice ? Number(filterParams.maxPrice) : undefined,
        amenities: filterParams.amenities.join(',') || undefined,
        pageSize: 10,
      };

      // Remove undefined values
      Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

      const response = await roomApi.list(params);
      setRooms(response.rooms || []);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateFiltersAndFetch = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Update URL with all filter parameters
    const params = new URLSearchParams();
    if (updatedFilters.roomTitle) params.append('roomTitle', updatedFilters.roomTitle);
    if (updatedFilters.roomType.length) params.append('roomType', updatedFilters.roomType.join(','));
    if (updatedFilters.country.length) params.append('country', updatedFilters.country.join(','));
    if (updatedFilters.minPrice) params.append('min', updatedFilters.minPrice);
    if (updatedFilters.maxPrice) params.append('max', updatedFilters.maxPrice);
    if (updatedFilters.amenities.length) params.append('amenities', updatedFilters.amenities.join(','));

    navigate(`?${params.toString()}`, { replace: true });
    fetchRooms(updatedFilters);
  };

  // Handle toggling of array-based filters (country, roomType, amenities)
  const toggleArrayFilter = (filterName, value) => {
    const currentValues = filters[filterName];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    updateFiltersAndFetch({ [filterName]: newValues });
  };

  return (
    <section className="w-full h-full pt-26 px-8 pb-8 bg-zinc-100">
      <div className="w-full flex h-full gap-8">
        {/* Filters Sidebar */}
        <div className="w-[300px] h-[800px] flex flex-col gap-4">
          {/* Country Filter - Multi-select */}
          <ul className="mt-2">
            <h3 className="text-base font-medium">Location</h3>
            {countries.map((country , index) => (
              <div key={country?.index} className="flex items-center gap-2 mt-2">
                <input
                  id={`country-${index}`}
                  type="checkbox"
                  checked={filters.country.includes(country.name)}
                  onChange={() => toggleArrayFilter('country', country.name)}
                  className="!w-fit"
                />
                <label htmlFor={`country-${index}`} className="text-sm cursor-pointer">
                  {country.name}
                </label>
              </div>
            ))}
          </ul>

          {/* Budget Filter */}
          <ul>
            <h3 className="text-base font-medium">Budget</h3>
            <div className="w-full flex items-center gap-2 mt-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={e => updateFiltersAndFetch({ minPrice: e.target.value })}
                className="!w-[146px] !flex-1 border border-zinc-400 p-3 rounded-lg"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={e => updateFiltersAndFetch({ maxPrice: e.target.value })}
                className="!w-[146px] !flex-1 border border-zinc-400 p-3 rounded-lg"
              />
            </div>
          </ul>

          {/* Room Type Filter - Multi-select */}
          <ul className="mt-2">
            <h3 className="text-base font-medium">Room Type</h3>
            {['Studio', 'Apartment', 'Private Room'].map((type, index) => {
              const typeValue = type.toLowerCase();
              return (
                <div key={typeValue} className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={filters.roomType.includes(typeValue)}
                    onChange={() => toggleArrayFilter('roomType', typeValue)}
                    className="!w-fit"
                    id={`type-${index}`}
                  />
                  <label htmlFor={`type-${index}`} className="text-sm">{type}</label>
                </div>
              );
            })}
          </ul>

          {/* Amenities Filter - Multi-select */}
          <ul className="mt-2">
            <h3 className="text-base font-medium">Amenities</h3>
            {['Heating', 'Dryer', 'Air Conditioning'].map((amenity , index) => (
              <div key={amenity} className="flex items-center gap-2 mt-2">
                <input
                 id={`amenties-${index}`}
                  type="checkbox"
                  checked={filters.amenities.includes(amenity)}
                  onChange={() => toggleArrayFilter('amenities', amenity)}
                  className="!w-fit"
                />
                <label htmlFor={`amenties-${index}`} className="text-sm">{amenity}</label>
              </div>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-full h-full">
          <div className="map w-full rounded-lg bg-white h-[800px] relative overflow-hidden">
            <Map rooms={rooms} />
            <div className="search absolute top-0 left-0 w-full p-4">
              <input
                type="text"
                value={filters.roomTitle}
                onChange={e => updateFiltersAndFetch({ roomTitle: e.target.value })}
                className="w-full !bg-white px-6 py-3 rounded-full"
                placeholder="Search Here"
              />
            </div>
          </div>

          {/* Results Header */}
          <div className="w-full my-2">
            <div className="flex items-center justify-between">
              <p>
                {rooms.length} {rooms.length === 1 ? 'Rental' : 'Rentals'} Found
              </p>
              <div className="flex items-center gap-2">
                {/* Sorting controls... */}
              </div>
            </div>
          </div>

          {/* Property Grid */}
          <div className="w-full grid grid-cols-4 gap-4 my-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <Property key={i} loading={true} />
                ))
              : rooms.length > 0
                  ? rooms.map((room,index) => <Property
  id={index}
  slug={room?.slug}
    image={room.images?.[0] || "https://via.placeholder.com/1000"} 
  title={room?.roomTitle}
  price={room?.pricePerMonth}
  address={room?.location?.address}
  billsIncluded={true}
  isVerified={true}
/>
)
                  : <div className="col-span-4 text-center py-10">
                      <p>No properties found matching your criteria</p>
                    </div>}
          </div>

          {/* FAQ Section */}
        </div>
      </div>
    </section>
  );
};

export default AfterSearch;