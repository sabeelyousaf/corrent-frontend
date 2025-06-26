import React, { useState } from 'react';
import { assets } from '../../../constants';
import Select from 'react-select';
import { styles } from '../../select/style';
import { useNavigate } from 'react-router-dom';

export default function HeroSection({countries}) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [roomType, setRoomType] = useState(null);
  const [location, setLocation] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (roomType?.value) params.append('roomType', roomType.value);
    if (location?.value) params.append('location', location.value);

    navigate(`/property?${params.toString()}`);
  };

  // Example options - replace with your actual data
  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'studio', label: 'Studio' },
    { value: 'private room' , label:"Private Room"}
  ];


const locations = countries.map((val, index) => ({
  value: val.name.toLowerCase(), 
  label: val.name
}));

  return (
    <section className="w-full bg-white">
      <div className="image-container w-full h-[800px] bg-red-50 overflow-hidden relative">
        <img
          className="w-full h-full object-center object-cover"
          src={assets.bg}
          alt=""
        />

        <div className="overlay w-full h-full absolute top-0 left-0 bg-black/65 flex justify-center items-center">
          <div className="content_area flex flex-col lg:flex-row items-center justify-between gap-10 px-4">

            {/* Left Heading */}
            <div className="text-white text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl leading-10 lg:leading-[4rem] font-semibold mb-4">
                Find Your Perfect <br /> Property with Us
              </h1>
              <p className="font-semibold">
                Discover Your Dream Property with Us - Where Perfect
                <br className="hidden md:block" />
                Meets Possible in Every Home.
              </p>
            </div>

            {/* Right Form */}
            <div className="w-full max-w-[400px]">
              <div className="btns flex items-center">
                <button className="w-[115px] h-[40px] rounded-tl-md bg-accent_blue hover:bg-accent_blue_dark text-white font-medium text-sm cursor-pointer">
                  Rent
                </button>
              
              </div>

              <form onSubmit={handleSearch} className="w-full p-4 bg-white rounded-b-lg rounded-tr-lg flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Type Keyword"
                  className="border p-2 rounded"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Select
                  styles={styles}
                  options={propertyTypes}
                  value={roomType}
                  onChange={setRoomType}
                  placeholder="Property Type"
                />
                <Select
                  styles={styles}
                  options={locations}
                  value={location}
                  onChange={setLocation}
                  placeholder="Location"
                />
                <div className="btn-row flex items-center gap-2">
                  <button type="submit" className="btn !bg-accent_red w-full hover:!bg-accent_red_dark">
                    Search Now
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
