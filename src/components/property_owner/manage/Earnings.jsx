import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import MonthlyEarningCard from '../../dashboard/MonthlyEarningCard';
import ExpensesCard from '../../dashboard/ExpensesCard';
import PropertyIncomeCards from '../../dashboard/PropertyIncomeCards';
import PropertyAdjustmentCard from '../../dashboard/PropertyAdjustmentCard';


const images = [
    'https://picsum.photos/1000/1000',
    'https://picsum.photos/1000/1200',
    'https://picsum.photos/1000/2000',
];

const Earnings = () => {
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

                <div className='flex-1'>
                    <div className=' grid grid-cols-2 gap-4'>
                        <MonthlyEarningCard />
                        <ExpensesCard />
                        <PropertyIncomeCards />
                        <PropertyAdjustmentCard />
                    </div>

                </div>
            </div>

            <div className='w-full p-4 bg-white rounded-lg flex items-center justify-between mt-4'>
                <p className='text-lg font-semibold'>Generate  a Report</p>

                <button className='flex items-center gap-2 bg-accent_red text-white font-medium px-4 p-2 text-sm rounded cursor-pointer'>

                    <span>Export to CSV</span>
                </button>
            </div>
        </section>
    );
};

export default Earnings;
