import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Map from '../../components/Map';
import { IoGridOutline } from "react-icons/io5";
import { BsList } from "react-icons/bs";
import Property from '../../components/Property';
import Accordion from '../../components/Accordion';
import { InlineWidget } from 'react-calendly';
import { FiUpload } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { propertyDetailsFeatures, propertyTags } from '../../../static_data';
import { assets } from '../../../constants';
import { roomApi } from '../../api/room';

const PropertyDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [bookingStatus, setBookingStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [similar, setSimilar] = useState([]);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [bookedDates, setBookedDates] = useState([]); 
  
  const fetchRoom = useCallback(async () => {
    try {
      setLoading(true);
      const response = await roomApi.get(id);
      setRoom(response?.room);
      return response?.room?._id; // Return room ID for chaining
    } catch (error) {
      console.error("Error fetching room:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  // New function to fetch booked dates
  const fetchBookedDates = useCallback(async (roomId) => {
    try {
      const response = await roomApi.get_booked_dates(roomId);
      if (response.success) {
        setBookedDates(response.bookedDates.map(date => new Date(date)));
      }
    } catch (error) {
      console.error("Error fetching booked dates:", error);
    }
  }, []);

  useEffect(() => {
    const loadRoomAndDates = async () => {
      if (id) {
        const roomId = await fetchRoom();
        if (roomId) {
          fetchBookedDates(roomId);
        }
      }
    };
    
    loadRoomAndDates();
  }, [id, fetchRoom, fetchBookedDates]);

  const fetchSimilarRooms = useCallback(async (id) => {
    try {
      setSimilarLoading(true);
      const response = await roomApi.similar(id);
      setSimilar(response?.similarRooms || []);
    } catch (error) {
      console.error("Error fetching similar rooms:", error);
    } finally {
      setSimilarLoading(false);
    }
  }, []);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const isDateBooked = (date) => {
    return bookedDates.some(bookedDate => 
      date.toDateString() === bookedDate.toDateString()
    );
  };

  const handleCheckBooking = async (e) => {
    e.preventDefault();
    if (!checkInDate || !checkOutDate) {
      alert('Please select both check-in and check-out dates');
      return;
    }
    
    try {
      setBookingLoading(true);
      const formattedCheckIn = formatDate(checkInDate);
      const formattedCheckOut = formatDate(checkOutDate);
      
      const response = await roomApi.check_booking(
        room?._id, 
        formattedCheckIn, 
        formattedCheckOut
      );
      
      if (response?.booking === null) {
        setBookingStatus({ available: true, message: 'Room is available for these dates!' });
      } else {
        setBookingStatus({ 
          available: false, 
          message: 'Room is not available for these dates' 
        });
      }
    } catch (error) {
      console.error("Error checking booking:", error);
      setBookingStatus({ 
        available: false, 
        message: error.response?.data?.message || 'Failed to check availability' 
      });
    } finally {
      setBookingLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSimilarRooms(id);
    }
  }, [id, fetchSimilarRooms]);

  if (loading) return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
  if (!room) return <div className="w-full h-screen flex items-center justify-center">Room not found</div>;

  const bedroomFacilities = [
    { key: 'singleBed', label: 'Single Bed' },
    { key: 'twinBed', label: 'Twin Bed' },
    { key: 'doubleBed', label: 'Double Bed' },
    { key: 'wardrobe', label: 'Wardrobe' },
    { key: 'balcony', label: 'Balcony' },
    { key: 'unfurnished', label: 'Unfurnished' },
    { key: 'window', label: 'Window' },
    { key: 'desk', label: 'Desk' },
    { key: 'lock', label: 'Lock' },
    { key: 'mirror', label: 'Mirror' },
    { key: 'heating', label: 'Heating' }
  ];

  const monthlyPrices = room?.differentMonthlyValue
    ? Object.entries(room?.differentMonthlyPrices || {}).map(([month, price]) => ({
        month: month.substring(0, 3),
        price,
        status: "available"
      }))
    : Array.from({ length: 12 }, (_, i) => {
        const month = new Date(0, i).toLocaleString('en', { month: 'short' });
        return {
          month,
          price: room?.pricePerMonth || 0,
          status: "available"
        };
      });

  return (
    <section className='w-full h-full pt-26 px-8 pb-8 bg-zinc-100'>
      <div className='w-full h-full'>
        <div className="w-full flex h-full gap-4">
          <div className='w-full h-full flex-1 flex flex-col gap-4'>
            <div className="flex items-center gap-2 h-[500px]">
              <div className='flex-1 h-full'>
                <img 
                  className='w-full rounded-lg h-full object-center object-cover' 
                  src={room.images?.[0]?.url || "https://picsum.photos/1000/1000"} 
                  alt="Main" 
                />
              </div>
              <div className='w-[450px] h-full flex flex-col gap-2'>
                {room.images?.slice(1, 5).map((image, index) => (
                  <img 
                    key={index}
                    className='rounded-lg h-[100px] flex-1 object-center object-cover' 
                    src={image.url || "https://picsum.photos/1000/1000"} 
                    alt={`Thumbnail ${index}`} 
                  />
                ))}
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div>
                <h3 className='primary_heading !text-3xl'>{room?.roomTitle || "Room Title"}</h3>
                <p className='flex items-center gap-2'>
                  <IoLocationSharp size={18} className='text-zinc-600' />
                  <span className='text-sm text-zinc-600'>
                    {room.location?.address || "Address not available"}
                  </span>
                </p>
              </div>
              <p className='text-2xl text-primary_text'>
                <b>${room?.pricePerMonth || 0}</b>/month
              </p>
            </div>

            <div className='flex items-center gap-2 flex-wrap'>
              <p className='text-xs bg-accent_blue/10 text-accent_blue_dark px-3 py-2 font-medium rounded-full'>
                {room?.roomType || "Room Type"}
              </p>
              <p className='text-xs bg-accent_blue/10 text-accent_blue_dark px-3 py-2 font-medium rounded-full'>
                {room?.size || "Size"} m²
              </p>
              {room?.suitableFors?.map((tag, index) => (
                <p 
                  key={index}
                  className='text-xs bg-accent_blue/10 text-accent_blue_dark px-3 py-2 font-medium rounded-full'
                >
                  {tag}
                </p>
              ))}
            </div>

            <div className='w-full border border-zinc-300 p-4 rounded-lg'>
              <h3 className='text-xl font-semibold text-primary_text'>Description</h3>
              <p className='text-sm text-zinc-600'>{room?.description || "No description available"}</p>
            </div>

            <div className='w-full border border-zinc-300 p-4 rounded-lg'>
              <h3 className='text-xl font-semibold text-primary_text'>Facilities</h3>
              <div className='flex flex-wrap gap-2 mt-2'>
                {bedroomFacilities.map((facility) => 
                  room?.bedroom?.[facility.key] && (
                    <p 
                      key={facility.key}
                      className='bg-zinc-200 text-xs px-3 py-2 rounded-full font-medium'
                    >
                      {facility.label}
                    </p>
                  )
                )}
              </div>
            </div>

            <div className='w-full border border-zinc-300 p-4 rounded-lg'>
              <h3 className='text-xl font-semibold text-primary_text'>Availability</h3>
              <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between mt-2 gap-4'>
                <ul className='text-sm space-y-1'>
                  <li>Minimum Stay: <b>{room?.minimumStay || 0} Months</b></li>
                  <li>Deposit: <b>${room?.deposit || 0}</b></li>
                  <li>Lock Type: <b>{room?.mechanicalLock || "Not specified"}</b></li>
                </ul>
              
                <div className='grid grid-cols-6 gap-2 max-w-full overflow-x-auto'>
                  {monthlyPrices.map((m, index) => (
                    <div 
                      key={index} 
                      className={`${m.status === "available" 
                        ? "bg-zinc-200" 
                        : "bg-red-200"} p-2 flex flex-col items-center rounded-lg justify-center min-w-[60px]`}
                    >
                      <p className={`${m.status === "available" 
                         ? "text-zinc-700" 
                         : "text-red-700"} text-xs`}>
                        {m.month}
                      </p>
                      <p className={`${m.status === "available" 
                         ? "text-zinc-700" 
                         : "text-red-700"} text-xs font-semibold`}>
                        ${m.price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='w-full border border-zinc-300 p-4 rounded-lg'>
              <h3 className='text-xl font-semibold text-primary_text'>Landlord Rules</h3>
              <div className='flex items-center gap-2 mt-2 flex-wrap'>
                {[
                  { label: "No smoking allowed", icon: "" },
                  { label: "Pets are not allowed", icon: "" },
                  { label: "Overnight guests are allowed", icon: "" },
                ].map((f, index) => (
                  <p 
                    key={index} 
                    className='bg-zinc-200 text-xs px-3 py-2 rounded-full font-medium'
                  >
                    {f.label}
                  </p>
                ))}
              </div>
            </div>
          </div>
          
          <div className='w-[400px] flex flex-col gap-2'>
            <ul className='w-full border border-zinc-300 rounded-lg p-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-base font-medium'>Booking Request</h3>
                <div className="flex items-center gap-2">
                  <button><FiUpload size={18} /></button>
                  <button><FaRegHeart size={18} /></button>
                </div>
              </div>

              <form onSubmit={handleCheckBooking} className='mt-4'>
                <div className='flex items-center gap-2 w-full my-2'>
                  <label className='flex-1'>
                    <span className='text-sm font-medium inline-block mb-1'>Check In</span>
                    <DatePicker
                      selected={checkInDate}
                      onChange={date => {
                        setCheckInDate(date);
                        if (checkOutDate && date >= checkOutDate) {
                          setCheckOutDate(null);
                        }
                      }}
                      filterDate={date => {
                        return date >= new Date() && !isDateBooked(date);
                      }}
                      minDate={new Date()}
                      placeholderText="Select date"
                      className="w-full p-2 border rounded-md"
                      dateFormat="yyyy-MM-dd"
                    />
                  </label>

                  <label className='flex-1'>
                    <span className='text-sm font-medium inline-block mb-1'>Check Out</span>
                    <DatePicker
                      selected={checkOutDate}
                      onChange={date => setCheckOutDate(date)}
                      filterDate={date => {
                        return date > checkInDate && !isDateBooked(date);
                      }}
                      minDate={checkInDate ? 
                        new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000) : 
                        new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                      }
                      placeholderText="Select date"
                      className="w-full p-2 border rounded-md"
                      disabled={!checkInDate}
                      dateFormat="yyyy-MM-dd"
                    />
                  </label>
                </div>
                
                <button 
                  type="submit" 
                  className={`btn !w-full text-sm ${bookingLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                  onClick={()=>{
                    window.location.href=`/checkout/${id}`
                  }}
                >
                  {bookingLoading ? 'Checking...' : 'Book Now'}
                </button>
                
                {bookingStatus && (
                  <div className={`mt-3 p-3 rounded-md text-center text-sm font-medium ${
                    bookingStatus.available 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {bookingStatus.message}
                  </div>
                )}
              </form>
            </ul>

            <ul className='w-full border border-zinc-300 rounded-lg p-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-base font-medium'>Location</h3>
              </div>
              <p className='flex items-center gap-2 mb-2'>
                <IoLocationSharp size={18} className='text-zinc-600' />
                <span className='text-sm text-zinc-600'>
                  {room.location?.address || "Address not available"}
                </span>
              </p>
              <div className='w-full h-[200px] mt-2 rounded-lg overflow-hidden'>
                <Map location={room.location} />
              </div>

              <form className='mt-2'>
                <p className='text-sm text-secondary_text mb-1'>Calculate route by public transport to:</p>
                <div className='flex items-center gap-2'>
                  <input 
                    type="text" 
                    placeholder='Work/University' 
                    className='flex-1 p-2 border rounded-md'
                  />
                  <button className='btn !text-sm'>Calculate</button>
                </div>
              </form>
            </ul>

            <ul className='w-full border border-zinc-300 rounded-lg p-4 flex flex-col gap-2'>
              {propertyDetailsFeatures.map((p, index) => (
                <p 
                  key={index} 
                  className='w-full bg-accent_blue/10 p-2 rounded-full flex items-center gap-2'
                >
                  <IoMdCheckmarkCircle size={18} className='text-accent_blue' />
                  <span className='text-accent_blue_dark text-sm'>{p}</span>
                </p>
              ))}
            </ul>
          </div>
        </div>

        <div className='w-full mt-6 flex flex-col items-center'>
          <h2 className='primary_heading !text-2xl'>Similar Properties</h2>
          <div className='w-full grid grid-cols-4 gap-4 my-6'>
            {similarLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <Property key={i} loading={true} />
                ))
              : similar.length > 0
                  ? similar.map((similarRoom) => (
                      <Property
                        key={similarRoom.id}
                        id={similarRoom.id}
                        slug={similarRoom.slug}
                        image={similarRoom.images?.[0]?.url || "https://picsum.photos/1000/1000"}
                        title={similarRoom.roomTitle}
                        price={similarRoom.pricePerMonth}
                        address={similarRoom.location?.address}
                        billsIncluded={similarRoom.billsIncluded}
                        isVerified={similarRoom.isVerified}
                      />
                    ))
                  : <div className="col-span-4 text-center py-10">
                      <p>No similar properties found</p>
                    </div>
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default PropertyDetails;