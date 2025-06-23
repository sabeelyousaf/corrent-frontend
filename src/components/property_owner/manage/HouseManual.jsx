import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const HouseManual = ({ property }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [fade, setFade] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);

    // Get property images
    const images = property.propertyImages?.map(img => img.url) || [];
    const hasImages = images.length > 0;
const imagesData = [
    'https://picsum.photos/1000/1000',
    'https://picsum.photos/1000/1200',
    'https://picsum.photos/1000/2000',
];
    const nextImage = () => {
        if (!hasImages) return;
        setFade(true);
        setTimeout(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
            setFade(false);
        }, 200);
    };

    const prevImage = () => {
        if (!hasImages) return;
        setFade(true);
        setTimeout(() => {
            setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
            setFade(false);
        }, 200);
    };

    const toggleAccordion = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    // House manual sections (using property data where available)
    const accordionData = [
        {
            title: "Home Rules",
            content: property.homeRules?.length > 0 
                ? property.homeRules 
                : ["No specific rules set"]
        },
        {
            title: "Policies",
            content: property.policies?.length > 0 
                ? property.policies 
                : ["Check-in: 3PM", "Check-out: 11AM"]
        },
        {
            title: "Move-in Instructions",
            content: property.moveInInstructions?.length > 0 
                ? property.moveInInstructions 
                : ["Contact property manager for instructions"]
        },
        {
            title: "Move-out Instructions",
            content: property.moveOutInstructions?.length > 0 
                ? property.moveOutInstructions 
                : ["Clean room before leaving", "Return all keys"]
        },
        {
            title: "Waste Pickup",
            content: property.wastePickupSchedule?.length > 0 
                ? property.wastePickupSchedule 
                : ["Wednesday: General waste", "Friday: Recycling"]
        },
        {
            title: "Devices",
            content: property.applianceInstructions?.length > 0 
                ? property.applianceInstructions 
                : ["WiFi: Connect to 'PropertyNetwork'", "Thermostat instructions available"]
        }
    ];

    return (
        <section className='w-full'>
            <div className='w-full flex flex-col lg:flex-row items-center h-auto lg:h-[600px] gap-4'>
                {/* Image Slider */}
                <div className='w-full lg:flex-2 bg-white rounded-lg h-[300px] lg:h-full relative overflow-hidden flex flex-col justify-between'>
                  
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

                {/* Accordion */}
                <div className='w-full lg:flex-1 h-auto lg:h-full bg-white rounded-lg p-4 overflow-y-auto'>
                    {accordionData.map((item, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div key={index} className='border-b border-gray-300 mb-2'>
                                <button
                                    onClick={() => toggleAccordion(index)}
                                    className='w-full flex justify-between items-center text-left font-semibold text-zinc-700 py-2'
                                >
                                    {item.title}
                                    <FaChevronDown
                                        className={`transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}
                                    />
                                </button>
                                <div
                                    className={`transition-all duration-300 overflow-hidden ${isActive ? 'max-h-96' : 'max-h-0'}`}
                                >
                                    <ul className='pl-4 pb-2 text-gray-700 space-y-1'>
                                        {item.content.map((line, i) => (
                                            <li key={i} className='list-disc'>{line}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className='mt-6'>
                <h3 className='text-lg font-semibold mb-4'>Mechanical Locks</h3>

                {property.rooms && property.rooms.length > 0 ? (
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
                        {property.rooms.map(room => (
                            <div key={room._id} className='w-full h-[150px] bg-white rounded-lg p-4 flex flex-col items-center justify-center border border-gray-200'>
                                <p className='text-lg font-semibold'>{room.roomTitle}</p>
                                <p className='text-sm text-zinc-600 mt-1'>Punch Code Lock</p>
                                <p className='font-medium text-lg mt-2'>{room.mechanicalLock || 'N/A'}</p>
                                <p className='text-xs text-gray-500 mt-1'>{room.roomType}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='w-full h-32 bg-white rounded-lg flex items-center justify-center'>
                        <p className='text-gray-500'>No rooms with locks added</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HouseManual