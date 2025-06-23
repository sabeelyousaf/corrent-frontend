import React from 'react'
import Select from "react-select"
import { styles } from '../../select/style'
import { MdOutlineFileDownload } from "react-icons/md";
const Downloads = () => {
    return (
        <section className='w-full'>
            <h2 className='text-xl font-semibold'>Downloads</h2>
            <div className='w-full flex flex-col gap-4 mt-4'>
                <div className='w-full bg-white p-4 rounded-lg flex flex-col'>
                    <h4 className='text-lg font-semibold'>By Room</h4>
                    <p className='text-sm text-zinc-700'>
                        Point in time information about each of your room,
                        including the current and most recent prices,
                        occupancy lengths, days on market and many more.
                    </p>

                    <button className='btn !w-fit text-sm self-end flex items-center gap-2'>

                        <span>
                            <MdOutlineFileDownload className='text-xl' />
                        </span>

                        <span>Download CSV</span>
                    </button>
                </div>

                <div className='w-full bg-white p-4 rounded-lg flex flex-col'>
                    <h4 className='text-lg font-semibold'>Room change History</h4>
                    <p className='text-sm text-zinc-700'>
                        A history of any price or status changes to the rooms in a given property.
                    </p>

                    <div className='flex items-center gap-2 mt-2'>
                        <span className='text-sm font-medium text-zinc-600'>Property</span>
                        <Select placeholder="Choose Property" styles={styles} />

                    </div>

                    <div className='flex items-center gap-4 mt-2'>
                        <div className='flex items-center gap-2'>
                            <span className='text-sm font-medium text-zinc-600'>Start Time</span>
                            <input className='text-sm p-3 border border-zinc-200 rounded-lg' type="date" />
                        </div>

                        <div className='flex items-center gap-2'>
                            <span className='text-sm font-medium text-zinc-600'>End Time</span>
                            <input className='text-sm p-3 border border-zinc-200 rounded-lg' type="date" />
                        </div>

                    </div>



                    <button className='btn !w-fit text-sm self-end flex items-center gap-2'>

                        <span>
                            <MdOutlineFileDownload className='text-xl' />
                        </span>

                        <span>Download CSV</span>
                    </button>
                </div>

                <div className='w-full bg-white p-4 rounded-lg flex flex-col'>
                    <h4 className='text-lg font-semibold'>Occupancy by a month for year</h4>
                    <p className='text-sm text-zinc-700'>
                        Historical Occupancy by month for each of your properties.
                    </p>

                    <div className='flex items-center gap-2 mt-2'>
                        <span className='text-sm font-medium text-zinc-600'>Year</span>
                        <Select placeholder="Choose Year" styles={styles} />
                    </div>





                    <button className='btn !w-fit text-sm self-end flex items-center gap-2'>

                        <span>
                            <MdOutlineFileDownload className='text-xl' />
                        </span>

                        <span>Download CSV</span>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Downloads
