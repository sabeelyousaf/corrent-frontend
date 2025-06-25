import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import MonthlyEarningCard from '../../dashboard/MonthlyEarningCard';
import ExpensesCard from '../../dashboard/ExpensesCard';
import PropertyIncomeCards from '../../dashboard/PropertyIncomeCards';
import PropertyAdjustmentCard from '../../dashboard/PropertyAdjustmentCard';
import { Link } from 'react-router-dom';
import { assets } from '../../../../constants';
import { useSelector } from 'react-redux';


const images = [
    'https://picsum.photos/1000/1000',
    'https://picsum.photos/1000/1200',
    'https://picsum.photos/1000/2000',
];

const Vehicles = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [fade, setFade] = useState(false);
    const user = useSelector((state) => state.auth.user);

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


    return (
        <section className='w-full'>
            <div className='w-full flex h-[386px] gap-4'>

                <div className='flex-2 w-full bg-white rounded-lg h-full relative overflow-hidden flex flex-col justify-between'>
                    <div className={`transition-opacity duration-300 h-full ${fade ? 'opacity-0' : 'opacity-100'}`}>
                        <img
                            src={images[currentImage]}
                            alt="Slide"
                            className='w-full h-full object-cover object-center rounded-lg'
                        />
                    </div>
                    <button onClick={prevImage} className='absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded'>‹</button>
                    <button onClick={nextImage} className='absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded'>›</button>

                    {/* Pagination Dots */}
                    <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2'>
                        {images.map((_, idx) => (
                            <span
                                key={idx}
                                className={`w-2 h-2 rounded-full ${idx === currentImage ? 'bg-black' : 'bg-gray-400'} transition-all`}
                            />
                        ))}
                    </div>
                </div>

                <div className='flex-1 bg-white rounded-lg p-4'>
                    <h3 className='text-lg font-semibold'>Vehicles</h3>
                    <hr className='border-zinc-200 mt-2' />

                    <div className='mt-4'>
                        <h4 className='font-medium'>Parking Availability</h4>
                        <ul className='mt-2 flex flex-col gap-2 text-sm text-zinc-600'>
                            <li>Street: 6 parking  spots</li>
                            <li>Driveway: 0 parking spots</li>
                            <li>Garage: 0 parking spots</li>
                        </ul>
                    </div>


                    <div className='mt-4'>
                        <h4 className='font-medium'>Parking Rules</h4>
                        <ol className='mt-2 flex flex-col gap-2 text-sm text-zinc-600'>
                            <li>Park only in designated areas assigned to you.</li>
                            <li>No blocking driveways, walkways, or emergency access routes</li>
                            <li>Visitor parking is limited to designated spots and timeframes</li>
                            <li>Maintain your vehicle to prevent oil leaks or damage to the property.</li>
                            <li>Unauthorized vehicles will be towed at the owner's expense</li>
                        </ol>
                    </div>
                </div>
            </div>

            <div className='my-4'>
                <div className='flex items-center justify-between'>
                    <h2 className='font-semibold text-lg'>Registered Vehicles</h2>
                     {user?.role === 'property_owner' && (
                    <Link className='btn text-sm !px-4'>Add Vehicle</Link>
                      )}
                </div>
                <div className='w-full grid grid-cols-2 gap-4 mt-2'>
                    <div className='w-full bg-white rounded-lg p-4 h-[150px] flex items-center justify-between'>
                        <div className='h-full flex items-center gap-4'>
                            <img src={assets.placeholder} alt="" className='w-[150px] h-full rounded-lg' />

                            <div className='flex flex-col gap-1'>
                                <h2>Honda Civic</h2>
                                <span>White</span>
                                <span><b>Vehicle No: </b>12345</span>
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <img src={assets.placeholder} className='w-[40px] h-[40px] rounded-full' alt="" />
                            <p>Shahzaib Khan</p>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default Vehicles;
