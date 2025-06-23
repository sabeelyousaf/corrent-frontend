import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import MonthlyEarningCard from '../../dashboard/MonthlyEarningCard';
import ExpensesCard from '../../dashboard/ExpensesCard';
import PropertyIncomeCards from '../../dashboard/PropertyIncomeCards';
import PropertyAdjustmentCard from '../../dashboard/PropertyAdjustmentCard';
import { Link } from 'react-router-dom';


const images = [
    'https://picsum.photos/1000/1000',
    'https://picsum.photos/1000/1200',
    'https://picsum.photos/1000/2000',
];

const Promotions = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [fade, setFade] = useState(false);

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
            <div className='w-full flex h-[428px] gap-4'>

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

                <div className='flex-1 bg-white rounded-lg p-4 flex flex-col gap-1'>
                    <div>
                        <h3 className='text-lg font-semibold'>Promo Code</h3>
                        <p className='text-sm text-zinc-600'>
                            Promo codes are valid for a limited time and must be applied at checkout to receive the discount.
                            Only one promo code can be used per transaction,
                            and they cannot be combined with other offers. Promo codes are non-transferable,
                            cannot be exchanged for cash, and are applicable only to eligible
                            properties as specified.
                        </p>
                        <button className="btn !w-fit text-sm mt-3">Add Promo Code</button>
                    </div>

                    <div className='mt-4'>
                        <h3 className='font-semibold mb-1'>Room Promotion</h3>
                        <div className='grid grid-cols-3 gap-2'>
                            <div>
                                <span className='text-sm font-medium text-zinc-600'>Total Bedrooms</span>
                                <p className='text-sm font-semibold'>10 Bedrooms</p>
                            </div>

                            <div>
                                <span className='text-sm font-medium text-zinc-600'>Occupancies</span>
                                <p className='text-sm font-semibold'>4 Bedrooms Occupied</p>
                            </div>

                            <div>
                                <span className='text-sm font-medium text-zinc-600'>Promotions</span>
                                <p className='text-sm font-semibold'>2 Active Promotions</p>
                            </div>
                        </div>

                        <div className='w-full bg-zinc-100 p-2 flex items-center rounded gap-2 mt-4'>
                            <p className='text-sm flex-2'>77 Sparkes Road (Room 5)</p>

                            <p className='bg-yellow-300/20 px-3 py-1 rounded'>
                                <span className='text-sm font-medium text-accent_red'>Vacant</span>
                            </p>

                            <p className='text-sm'>5% off 6 weeks</p>

                            <Link className='text-sm font-medium text-accent_red'>Price Details</Link>
                        </div>

                        <div className='w-full bg-zinc-100 p-2 flex items-center rounded gap-2 mt-2'>
                            <p className='text-sm flex-2'>77 Sparkes Road (Room 5)</p>

                            <p className='bg-yellow-300/20 px-3 py-1 rounded'>
                                <span className='text-sm font-medium text-accent_red'>Vacant</span>
                            </p>

                            <p className='text-sm'>5% off 6 weeks</p>

                            <Link className='text-sm font-medium text-accent_red'>Price Details</Link>
                        </div>
                    </div>
                </div>
            </div>


            <div className='mt-4'>
                <h3 className='text-lg font-semibold'>Create Flyer for this Property</h3>
                <div className='flex items-start gap-4'>
                    <div className='flex-1 mt-4'>
                        <span>Select a flyer design</span>

                        <div className='w-full'>
                            <div className='w-full bg-white rounded-lg p-4 flex items-center gap-2 mt-2'>
                                <input type="checkbox" />
                                <span>Simple (Clean & Modern)</span>
                            </div>

                            <div className='w-full bg-white rounded-lg p-4 flex items-center gap-2 mt-2'>
                                <input type="checkbox" />
                                <span>Friendly (Clean & Modern)</span>
                            </div>

                            <div className='w-full bg-white rounded-lg p-4 flex items-center gap-2 mt-2'>
                                <input type="checkbox" />
                                <span>Bold (Big & Eye Catching)</span>
                            </div>
                        </div>
                        <div className='flex items-center justify-between mt-3'>
                            <button className='w-fit px-4 py-2 border border-accent_blue rounded-md text-sm text-accent_blue font-medium'>Customize Flyer</button>
                            <button className='w-fit px-4 py-2 border bg-accent_blue rounded-md text-sm text-white font-medium'>Download Flyer</button>
                        </div>
                    </div>

                    <div className='flex-1 mt-4'>
                        <span>Preview</span>
                        <div className='w-full h-full bg-white rounded-lg'></div>


                    </div>

                </div>
            </div>



        </section>
    );
};

export default Promotions;
