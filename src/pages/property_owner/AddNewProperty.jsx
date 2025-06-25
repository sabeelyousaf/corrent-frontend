"use client"
import React, {useState} from 'react';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

import Map from '../../components/Map';
import ImageUploader from '../../components/ImageUploader';
import Loader from '../../components/Loader';
import {propertyApi} from '../../api/property';
import {FiHome, FiMapPin, FiMinus, FiPlus} from 'react-icons/fi';

const CheckboxGroup = ({title, items, values, onChange}) => (
  <div className="w-full flex flex-col">
    <span>{title}</span>
    <div className="grid grid-cols-4 gap-4 mt-1">
      {items.map (item => (
        <label key={item} className="flex items-center gap-2">
          <input
            type="checkbox"
            className="!w-auto"
            checked={values[item] || false}
            onChange={() => onChange (item)}
          />
          <span className="!text-sm font-medium text-zinc-700 mt-1">
            {item
              .replace (/([A-Z])/g, ' $1')
              .replace (/^./, str => str.toUpperCase ())}
          </span>
        </label>
      ))}
    </div>
  </div>
);

const AddNewProperty = () => {
  const navigate = useNavigate ();
  const [loading, setLoading] = useState (false);
  const [activeTab, setActiveTab] = useState ('basic');
  // Form state
  const [title, setTitle] = useState ('');
  const [size, setSize] = useState ('');
  const [country, setCountry] = useState ('');
  const [membersCapacity, setMembersCapacity] = useState (1);
  const [billsIncludedUpTo, setBillsIncludedUpTo] = useState (0);
  const [numberOfBathrooms, setNumberOfBathrooms] = useState (1);
  const [bathrooms, setBathrooms] = useState ([
    {toilet: false, shower: false, bath: false, sink: false},
  ]);
  const [kitchen, setKitchen] = useState ({
    microwave: false,
    oven: false,
    toaster: false,
    stove: false,
    fridge: false,
    freezer: false,
    kettle: false,
  });
  const [livingRoom, setLivingRoom] = useState ({
    tv: false,
    sofa: false,
    wifi: false,
    washingMachine: false,
    unfurnished: false,
    centralHeating: false,
    accessibilityNeeds: false,
    terrace: false,
    elevator: false,
    airConditioner: false,
    dishwasher: false,
    freeParking: false,
    garden: false,
  });
  const [location, setLocation] = useState ({
    lat: 0,
    lng: 0,
    address: '',
  });
  const [propertyImages, setPropertyImages] = useState ([]);

  const handleBathroomChange = (index, key) => {
    const newBathrooms = [...bathrooms];
    newBathrooms[index][key] = !newBathrooms[index][key];
    setBathrooms (newBathrooms);
  };

  const handleKitchenChange = key => {
    setKitchen (prev => ({...prev, [key]: !prev[key]}));
  };

  const handleLivingRoomChange = key => {
    setLivingRoom (prev => ({...prev, [key]: !prev[key]}));
  };

 const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData object for multipart/form-data
      const formData = new FormData();
      // Append simple fields
      formData.append('title', title);
      formData.append('size', size);
      formData.append('country', country);
      formData.append('membersCapacity', membersCapacity);
      formData.append('billsIncludedUpTo', billsIncludedUpTo);
      formData.append('numberOfBathrooms', numberOfBathrooms);
      formData.append('status', 'available');
      // Append complex fields as JSON strings
      formData.append('bathrooms', JSON.stringify(bathrooms.slice(0, numberOfBathrooms)));
      formData.append('kitchen', JSON.stringify(kitchen));
      formData.append('livingRoom', JSON.stringify(livingRoom));
      formData.append('location', JSON.stringify(location));

      // Append images
      propertyImages.forEach(file => {
        formData.append('images', file); 
      });

      // Call API with FormData
      const response = await propertyApi.create(formData);

      toast.success('Property created successfully!');
      // navigate('/property-owner/manage');
    } catch (error) {
      console.error('Create property error:', error);
      toast.error(error.response?.data?.message || error.message || 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  const bathroomItems = ['toilet', 'shower', 'bath', 'sink'];
  const kitchenItems = Object.keys (kitchen);
  const livingRoomItems = Object.keys (livingRoom);

  if (loading) return <Loader />;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <FiHome className="text-primary" />
          Add New Property
        </h1>
        <p className="text-gray-600 mt-2">
          Fill in the details to list your property
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 pb-4">
        {['basic', 'details', 'media'].map (tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            onClick={() => setActiveTab (tab)}
          >
            {tab.charAt (0).toUpperCase () + tab.slice (1)}
          </button>
        ))}
      </div>

      <form
        className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8"
        onSubmit={handleFormSubmit}
      >
        <div className="space-y-6">
          {/* Basic Info Tab */}
          {activeTab === 'basic' &&
            <div className="bg-white rounded-xl shadow-sm p-6 transition-all">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Basic Information
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apartment Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={title}
                    onChange={e => setTitle (e.target.value)}
                    required
                    placeholder="Modern Apartment in Downtown"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={size}
                      onChange={e => setSize (e.target.value)}
                      placeholder="e.g., 1200 sqft"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={country}
                      onChange={e => setCountry (e.target.value)}
                      placeholder="e.g., Dubai"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Members Capacity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={membersCapacity}
                      onChange={e =>
                        setMembersCapacity (Number (e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bills Included Up To ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={billsIncludedUpTo}
                      onChange={e =>
                        setBillsIncludedUpTo (Number (e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>}

          {/* Details Tab */}
          {activeTab === 'details' &&
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Property Details
                </h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Number of Bathrooms
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      className="p-2 bg-blue-100 text-primary rounded-full hover:bg-blue-200 transition-colors"
                      onClick={() =>
                        setNumberOfBathrooms (prev => Math.min (prev + 1, 5))}
                    >
                      <FiPlus />
                    </button>
                    <span className="bg-blue-50 text-primary px-5 py-2 rounded-lg text-lg font-bold min-w-[50px] text-center">
                      {numberOfBathrooms}
                    </span>
                    <button
                      type="button"
                      className="p-2 bg-blue-100 text-primary rounded-full hover:bg-blue-200 transition-colors"
                      onClick={() =>
                        setNumberOfBathrooms (prev => Math.max (prev - 1, 1))}
                    >
                      <FiMinus />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {Array.from ({length: numberOfBathrooms}).map ((_, index) => (
                    <CheckboxGroup
                      key={index}
                      title={`Bathroom ${index + 1}`}
                      items={bathroomItems}
                      values={bathrooms[index] || {}}
                      onChange={key => handleBathroomChange (index, key)}
                    />
                  ))}

                  <CheckboxGroup
                    title="Kitchen"
                    items={kitchenItems}
                    values={kitchen}
                    onChange={handleKitchenChange}
                  />

                  <CheckboxGroup
                    title="Living Room & Amenities"
                    items={livingRoomItems}
                    values={livingRoom}
                    onChange={handleLivingRoomChange}
                  />
                </div>
              </div>
            </div>}

          {/* Media Tab */}
          {activeTab === 'media' &&
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Property Images
              </h2>
              <ImageUploader
                images={propertyImages}
                setImages={setPropertyImages}
                multiple={true}
                maxFiles={10}
              />
            </div>}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {activeTab !== 'basic' &&
              <button
                type="button"
                className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
                onClick={() => {
                  const tabs = ['basic', 'details', 'media'];
                  setActiveTab (tabs[tabs.indexOf (activeTab) - 1]);
                }}
              >
                Back
              </button>}

            <button
              type={activeTab === 'media' ? 'submit' : 'button'}
              className="btn bg-blue-600 hover:bg-blue-700 text-white ml-auto"
              onClick={() => {
                if (activeTab !== 'media') {
                  const tabs = ['basic', 'details', 'media'];
                  setActiveTab (tabs[tabs.indexOf (activeTab) + 1]);
                }
              }}
              disabled={loading}
            >
              {activeTab === 'media'
                ? loading ? 'Creating...' : 'Add Property'
                : 'Continue'}
            </button>
          </div>
        </div>

        {/* Location Section - Always visible on desktop, tabbed on mobile */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <FiMapPin className="text-primary" />
              Location
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter property address"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={location.address}
                    onChange={e =>
                      setLocation (prev => ({
                        ...prev,
                        address: e.target.value,
                      }))}
                    required
                  />
                  {/* <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> */}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 h-[400px]">
                <Map
                  onLocationSelect={({lat, lng}) =>
                    setLocation (prev => ({...prev, lat, lng}))}
                  initialLocation={location}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Latitude</p>
                  <p className="font-medium">{location.lat.toFixed (6)}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Longitude</p>
                  <p className="font-medium">{location.lng.toFixed (6)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddNewProperty;
