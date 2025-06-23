import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../../components/ImageUploader';
import { propertyApi } from '../../api/property';
import { FiHome } from 'react-icons/fi';
import axios from 'axios';
import { roomApi } from '../../api/room';

const CheckboxGroup = ({ title, items, values, onChange, type = 'object', labelMap = null }) => (
  <div className="w-full flex flex-col mb-6">
    <span className="font-medium text-gray-700 mb-3">{title}</span>
    <div className="grid grid-cols-3 gap-4 mt-1">
      {items.map(item => (
        <label key={item} className="flex items-center gap-2">
          <input
            type="checkbox"
            className="!w-auto"
            checked={type === 'object' ? values[item] : values.includes(item)}
            onChange={() => onChange(item)}
          />
          <span className="text-sm font-medium text-zinc-700">
            {labelMap && labelMap[item] 
              ? labelMap[item] 
              : item
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, str => str.toUpperCase())
            }
          </span>
        </label>
      ))}
    </div>
  </div>
);

const AddNewRoom = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [roomImages, setRoomImages] = useState([]);
  const [properties, setProperties] = useState([]);

  // Form state
  const [roomData, setRoomData] = useState({
    propertyId: '',
    roomTitle: '',
    roomType: '',
    size: '',
    apartment: '',
    minimumStay: 1,
    description: '',
    amenities: [],
    bedroom: {
      singleBed: false,
      twinBed: false,
      doubleBed: false,
      wardrobe: false,
      balcony: false,
      unfurnished: false,
      window: false,
      desk: false,
      lock: false,
      mirror: false,
      heating: false,
    },
    suitableFors: [],
    pricePerMonth: 0,
    differentMonthlyValue: false,
    differentMonthlyPrices: {
      jan: 0,
      feb: 0,
      mar: 0,
      apr: 0,
      may: 0,
      jun: 0,
      jul: 0,
      aug: 0,
      sep: 0,
      oct: 0,
      nov: 0,
      dec: 0,
    },
    deposit: 0,
    mechanicalLock: '',
  });

  const propertyListing = async () => {
    const res = await propertyApi.all();
    setProperties(res?.properties);
    if (res?.properties?.length > 0) {
      setRoomData(prev => ({
        ...prev,
        propertyId: res.properties[0]._id
      }));
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setRoomData(prev => ({ ...prev, [name]: value }));
  };

  const handleBedroomChange = key => {
    setRoomData(prev => ({
      ...prev,
      bedroom: {
        ...prev.bedroom,
        [key]: !prev.bedroom[key],
      },
    }));
  };

  const handleAmenitiesChange = value => {
    setRoomData(prev => {
      const newAmenities = prev.amenities.includes(value)
        ? prev.amenities.filter(item => item !== value)
        : [...prev.amenities, value];

      return { ...prev, amenities: newAmenities };
    });
  };

  const handleSuitableForChange = value => {
    setRoomData(prev => {
      const newSuitableFors = prev.suitableFors.includes(value)
        ? prev.suitableFors.filter(item => item !== value)
        : [...prev.suitableFors, value];

      return { ...prev, suitableFors: newSuitableFors };
    });
  };

  const handleMonthlyPriceChange = (month, value) => {
    setRoomData(prev => ({
      ...prev,
      differentMonthlyPrices: {
        ...prev.differentMonthlyPrices,
        [month]: Number(value),
      },
    }));
  };

 const handleFormSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      
      // Create data object matching payload structure
      const payload = {
        propertyId: roomData.propertyId,
        roomTitle: roomData.roomTitle,
        roomType: roomData.roomType,
        size: roomData.size,
        apartment: roomData.apartment,
        minimumStay: roomData.minimumStay,
        description: roomData.description,
        amenities: roomData.amenities,
        bedroom: roomData.bedroom,
        suitableFors: roomData.suitableFors,
        pricePerMonth: roomData.pricePerMonth,
        differentMonthlyValue: roomData.differentMonthlyValue,
        differentMonthlyPrices: roomData.differentMonthlyValue 
          ? roomData.differentMonthlyPrices 
          : undefined,
        deposit: roomData.deposit,
        mechanicalLock: roomData.mechanicalLock
      };

      // Append JSON data as separate field
      formData.append('data', JSON.stringify(payload));
      
      // Append images
      roomImages.forEach(file => {
        formData.append('files', file);
      });

      // Call API
      const response = await roomApi.create(formData);
      toast.success('Room added successfully!');
      navigate('/property-owner/manage');
    } catch (error) {
      console.error('Add room error:', error);
      toast.error(error.response?.data?.message || 'Failed to add room');
    } finally {
      setLoading(false);
    }
  };
  const bedroomItems = Object.keys(roomData.bedroom);
  
  // Updated to match enum values
  const suitableForItems = [
    'males',
    'females',
    'professionals',
    'students',
    'pets',
    'smokers',
    'overnight',
    'guests',
    'couples',
  ];

  // Display labels for suitableForItems
  const suitableForLabels = {
    males: 'Males',
    females: 'Females',
    professionals: 'Professionals',
    students: 'Students',
    pets: 'Pets',
    smokers: 'Smokers',
    overnight: 'Overnight',
    guests: 'Guests',
    couples: 'Couples',
  };

  // Updated to match enum values
  const amenityItems = [
    'private bathroom',
    'shared bathroom',
    'balcony',
    'air conditioning',
    'heating',
    'wardrobe',
    'desk',
    'window',
    'wifi',
    'tv',
    'mini fridge',
    'microwave',
    'kitchen access',
    'cleaning service',
  ];

  const months = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];

  useEffect(() => {
    propertyListing();
  }, []);

  return (
    <section className="w-full max-w-8xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <FiHome className="text-primary" />
          Add New Room
        </h1>
      </div>

      <form onSubmit={handleFormSubmit}>
        {/* Upload Room Photos */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Upload Room Photos
          </h2>
          <ImageUploader
            images={roomImages}
            setImages={setRoomImages}
            multiple={true}
            maxFiles={10}
          />
        </div>

        {/* Property Title Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Property
              </label>
              <select
                name="propertyId"
                value={roomData.propertyId}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Property</option>
                {properties?.map((property) => (
                  <option key={property._id} value={property._id}>
                    {property.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room Title
              </label>
              <input
                type="text"
                name="roomTitle"
                value={roomData.roomTitle}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Master Bedroom with Balcony"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <input
                type="text"
                name="size"
                value={roomData.size}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 10 sqm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Room type
              </label>
              <select
                name="roomType"
                value={roomData.roomType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select Room type</option>
                <option value="studio">Studio</option>
                <option value="apartment">Apartment</option>
                <option value="private room">Private Room</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-medium text-gray-700 mb-4">Apartment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apartment
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={roomData.apartment}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Block A"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum stay
                </label>
                <input
                  type="number"
                  name="minimumStay"
                  value={roomData.minimumStay}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Description
          </h2>
          <textarea
            name="description"
            value={roomData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
            placeholder="Enter a description..."
            required
          />
        </div>

        {/* Amenities Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Amenities
          </h2>
          <CheckboxGroup
            items={amenityItems}
            values={roomData.amenities}
            onChange={handleAmenitiesChange}
            type="array"
          />
        </div>

        {/* Price Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Price $ per month
          </h2>

          <div className="flex items-center mb-4">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={roomData.differentMonthlyValue}
                  onChange={() =>
                    setRoomData(prev => ({
                      ...prev,
                      differentMonthlyValue: !prev.differentMonthlyValue,
                    }))}
                  className="sr-only"
                />
                <div
                  className={`block w-14 h-8 rounded-full ${roomData.differentMonthlyValue ? 'bg-blue-500' : 'bg-gray-400'}`}
                />
                <div
                  className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${roomData.differentMonthlyValue ? 'transform translate-x-6' : ''}`}
                />
              </div>
              <div className="ml-3 text-gray-700 font-medium">
                Different Monthly Prices
              </div>
            </label>
          </div>

          {roomData.differentMonthlyValue
            ? <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                {months.map(month => (
                  <div key={month} className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1 capitalize">
                      {month}
                    </label>
                    <input
                      type="number"
                      value={roomData.differentMonthlyPrices[month]}
                      onChange={e =>
                        handleMonthlyPriceChange(month, e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      min="0"
                    />
                  </div>
                ))}
              </div>
            : <div className="flex items-center">
                <span className="text-gray-700 mr-3">Monthly Price:</span>
                <input
                  type="number"
                  name="pricePerMonth"
                  value={roomData.pricePerMonth}
                  onChange={handleChange}
                  className="w-32 p-2 border border-gray-300 rounded"
                  min="0"
                  required
                />
                <span className="ml-2">$</span>
              </div>}

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deposit
            </label>
            <input
              type="number"
              name="deposit"
              value={roomData.deposit}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
              required
            />
          </div>
        </div>

        {/* Bedroom Amenities */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Bedroom
          </h2>
          <CheckboxGroup
            items={bedroomItems}
            values={roomData.bedroom}
            onChange={handleBedroomChange}
          />
        </div>

        {/* Suitable For */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Suitable for
          </h2>
          <CheckboxGroup
            items={suitableForItems}
            values={roomData.suitableFors}
            onChange={handleSuitableForChange}
            type="array"
            labelMap={suitableForLabels}
          />
        </div>

        {/* Mechanical Lock */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Mechanical Lock
          </h2>
          <input
            type="text"
            name="mechanicalLock"
            value={roomData.mechanicalLock}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter lock code"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            disabled={loading}
          >
            {loading ? 'Adding Room...' : 'Add Room'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddNewRoom;