import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { assets } from '../../../../constants';

const Overview = ({ property }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [fade, setFade] = useState(false);
const imagesData = [
    'https://picsum.photos/1000/1000',
    'https://picsum.photos/1000/1200',
    'https://picsum.photos/1000/2000',
];

    // Get all images from property and rooms
    const propertyImages = property.propertyImages || [];
    const roomImages = property.rooms.flatMap(room => room.images || []);
    const allImages = [...propertyImages, ...roomImages].map(img => img.url);
    const hasImages = allImages.length > 0;

    // If no images, use placeholder
    const images = hasImages ? allImages : [assets.placeholder];

    const nextImage = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
            setFade(false);
        }, 200);
    };

    const prevImage = () => {
        setFade(true);
        setTimeout(() => {
            setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
            setFade(false);
        }, 200);
    };

    // Property features from livingRoom and kitchen
    const propertyFeatures = [
        ...Object.entries(property.livingRoom || {})
            .filter(([key, value]) => value && key !== '_id')
            .map(([key]) => key),
        ...Object.entries(property.kitchen || {})
            .filter(([key, value]) => value && key !== '_id')
            .map(([key]) => key)
    ];

    return (
        <section className='w-full'>
            <div className='w-full flex flex-col md:flex-row items-center h-auto md:h-[515px] gap-4'>
                <div className='w-full md:flex-2 bg-white rounded-lg h-[300px] md:h-full relative overflow-hidden flex flex-col justify-between'>
                     <div className={`transition-opacity duration-300 h-full ${fade ? 'opacity-0' : 'opacity-100'}`}>
                        <img
                            src={imagesData[currentImage]}
                            alt="Slide"
                            className='w-full h-full object-cover object-center rounded-lg'
                        />
                    </div>
                    
                    {hasImages && (
                        <>
                            <button onClick={prevImage} className='absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded'>‹</button>
                            <button onClick={nextImage} className='absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded'>›</button>
                            <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
                                {images.map((_, idx) => (
                                    <span
                                        key={idx}
                                        className={`w-2 h-2 rounded-full ${idx === currentImage ? 'bg-black' : 'bg-gray-400'} transition-all`}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className='w-full md:flex-1 h-auto md:h-full bg-white rounded-lg p-4 overflow-y-auto flex flex-col gap-4'>
                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-4'>
                            <h3 className='font-semibold text-zinc-700'>Property Details</h3>
                            <hr className='inline-block flex-1 border-[1.5px] border-zinc-200' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='flex w-full justify-between'>
                                <span className='text-left text-sm text-zinc-700 font-medium'>Property Size</span>
                                <span className='text-right text-sm text-zinc-600'>{property.size}</span>
                            </p>

                            <p className='flex w-full justify-between'>
                                <span className='text-left text-sm text-zinc-700 font-medium'>Capacity</span>
                                <span className='text-right text-sm text-zinc-600'>{property.membersCapacity} people</span>
                            </p>

                            <p className='flex w-full justify-between'>
                                <span className='text-left text-sm text-zinc-700 font-medium'>Bathrooms</span>
                                <span className='text-right text-sm text-zinc-600'>{property.numberOfBathrooms}</span>
                            </p>
                            
                            <p className='flex w-full justify-between'>
                                <span className='text-left text-sm text-zinc-700 font-medium'>Country</span>
                                <span className='text-right text-sm text-zinc-600'>{property.country}</span>
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-4'>
                            <h3 className='font-semibold text-zinc-700'>Financial Information</h3>
                            <hr className='inline-block flex-1 border-[1.5px] border-zinc-200' />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <p className='flex w-full justify-between'>
                                <span className='text-left text-sm text-zinc-700 font-medium'>Bills Included Up To</span>
                                <span className='text-right text-sm text-zinc-600'>${property.billsIncludedUpTo}</span>
                            </p>

                            <p className='flex w-full justify-between'>
                                <span className='text-left text-sm text-zinc-700 font-medium'>Created At</span>
                                <span className='text-right text-sm text-zinc-600'>
                                    {new Date(property.createdAt).toLocaleDateString()}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-4'>
                            <h3 className='font-semibold text-zinc-700'>Property Features</h3>
                            <hr className='inline-block flex-1 border-[1.5px] border-zinc-200' />
                        </div>

                        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                            {propertyFeatures.length > 0 ? (
                                propertyFeatures.map((feature, index) => (
                                    <p key={index} className='w-full flex items-center justify-center bg-zinc-100 rounded-lg p-2 text-xs md:text-sm text-zinc-600 font-medium text-center capitalize'>
                                        {feature.replace(/([A-Z])/g, ' $1').trim()}
                                    </p>
                                ))
                            ) : (
                                <p className='col-span-3 text-center text-gray-500 py-2'>
                                    No features listed
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full flex flex-col gap-4 mt-4'>
                <h2 className='text-xl font-bold'>Rooms</h2>
                
                {property.rooms && property.rooms.length > 0 ? (
                    property.rooms.map(room => (
                        <div key={room._id} className='w-full h-[150px] bg-white rounded-lg p-4 flex items-center justify-between'>
                            <div className='h-full flex items-center gap-4'>
                                {room.images && room.images.length > 0 ? (
                                    <img 
                                        src={room.images[0].url} 
                                        alt={room.roomTitle} 
                                        className='w-[120px] md:w-[200px] h-full rounded-lg object-cover object-center' 
                                    />
                                ) : (
                                    <div className='w-[120px] md:w-[200px] h-full bg-gray-100 rounded-lg flex items-center justify-center'>
                                        <span className='text-gray-500 text-sm'>No image</span>
                                    </div>
                                )}

                                <div>
                                    <h3 className='text-lg font-semibold'>{room.roomTitle}</h3>
                                    <ul className='text-sm text-zinc-700'>
                                        <li>Type: {room.roomType}</li>
                                        <li>Size: {room.size}</li>
                                        <li>Min Stay: {room.minimumStay} months</li>
                                    </ul>
                                </div>
                            </div>

                            <div className='text-right'>
                                <p className={`px-4 py-2 rounded-lg flex items-center justify-center ${
                                    room.status === 'vacant' ? 'bg-green-600' : 
                                    room.status === 'occupied' ? 'bg-blue-600' : 'bg-red-600'
                                }`}>
                                    <span className='text-sm font-medium text-white capitalize'>
                                        {room.status || 'inactive'}
                                    </span>
                                </p>

                                <ul className='mt-2'>
                                    <li className='text-base font-semibold'>Monthly Price</li>
                                    <li className='text-zinc-600 font-medium'>${room.pricePerMonth}</li>
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className='w-full h-32 bg-white rounded-lg flex items-center justify-center'>
                        <p className='text-gray-500'>No rooms added yet</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Overview;