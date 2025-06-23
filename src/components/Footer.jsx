import React from 'react'
import { assets, navAndFooterHiddenRoutes } from '../../constants'
import { Link, useLocation } from 'react-router-dom'
import { CiPhone } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
const Footer = ({ isAuthenticated, user }) => {
    const location = useLocation()

    let hiddenRoutes = navAndFooterHiddenRoutes.includes(location.pathname) || (isAuthenticated && user?.role !== "user");

    return (
        <section className={`${hiddenRoutes ? "hidden" : ""} w-full bg-zinc-900 flex flex-col items-center`}>
            <div className="content_area py-16">
                <div className='w-full grid grid-cols-2 gap-4'>
                    <div className='w-full bg-zinc-800 rounded-lg p-4 flex items-top gap-4'>
                        <img className='w-[100px] h-[100px] rounded-lg object-center object-cover' src={assets.placeholder} alt="" />
                        <div className='flex flex-col'>
                            <h3 className='text-xl font-semibold text-white mb-1'>You need a house</h3>
                            <p className='text-white/80 text-sm'>Tell us your needs, we will give you thousands of suggestions for the dream home.</p>

                            <Link className='btn !w-[150px] mt-2 text-center text-sm'>Contact Seller</Link>
                        </div>
                    </div>

                    <div className='w-full bg-zinc-800 rounded-lg p-4 flex items-top gap-4'>
                        <img className='w-[100px] h-[100px] rounded-lg object-center object-cover' src={assets.placeholder} alt="" />
                        <div className='flex flex-col'>
                            <h3 className='text-xl font-semibold text-white mb-1'>Rent Your House</h3>
                            <p className='text-white/80 text-sm'>We will connect you to thousands of people who need to buy a home.</p>

                            <Link className='btn !w-[150px] mt-2 text-center text-sm'>Rent Property</Link>
                        </div>
                    </div>
                </div>
            </div>

            <hr className='border-zinc-800 w-full inline-block' />

            <div className="content_area py-16">
                <div className='w-full grid grid-cols-4 gap-8'>
                    <div>
                        <h3 className='text-white text-lg font-semibold'>Office Address</h3>
                        <ul className='mt-3 flex flex-col gap-2'>
                            <li>
                                <span className='text-sm text-zinc-500 inline-block mb-1'>Head Office</span>
                                <p className='text-white'>1245 Maple St, Denver, CO 80202</p>
                            </li>

                            <li>
                                <span className='text-sm text-zinc-500 inline-block mb-1'>Branch</span>
                                <p className='text-white'>6789 Oakwood Ave, Los Angeles, CA 90036</p>
                                <p className='text-white mt-2'>1990 Crestview Dr, Boston, MA 02108</p>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className='text-white text-lg font-semibold'>Contact Seller</h3>
                        <ul className='mt-3 flex flex-col gap-4'>
                            <li className='flex items-center gap-4'>
                                <img className='w-[64px] h-[64px] rounded-full object-center object-cover' src={assets.placeholder} alt="" />

                                <div>
                                    <span className='text-sm text-zinc-500 inline-block mb-1'>Darrell Steward</span>
                                    <Link>
                                        <p className='text-white'>(+971) 555-55812</p>
                                    </Link>
                                </div>
                            </li>

                            <li className='flex items-center gap-4'>
                                <CiPhone className='text-3xl text-zinc-500' />

                                <div>
                                    <span className='text-sm text-zinc-500 inline-block mb-1'>Hotline</span>
                                    <Link>
                                        <p className='text-white'>(+971) 555-55812</p>
                                    </Link>
                                </div>
                            </li>

                            <li className='flex items-center gap-4'>
                                <MdOutlineMail className='text-3xl text-zinc-500' />

                                <div>
                                    <span className='text-sm text-zinc-500 inline-block mb-1'>Email</span>
                                    <Link>
                                        <p className='text-white'>roomsforrentals@gmail.com</p>
                                    </Link>
                                </div>
                            </li>


                        </ul>
                    </div>

                    <div>
                        <h3 className='text-white text-lg font-semibold'>Our Company</h3>
                        <ul className='mt-4'>
                            <li className='flex flex-col gap-3'>
                                <Link className='text-white text-sm'>Property For Sale</Link>
                                <Link className='text-white text-sm'>About Us</Link>
                                <Link className='text-white text-sm'>Our Agents</Link>
                                <Link className='text-white text-sm'>Terms of Use</Link>
                                <Link className='text-white text-sm'>Privacy Policy</Link>
                                <Link className='text-white text-sm'>Contact Us</Link>
                            </li>
                        </ul>
                    </div>


                    <div>
                        <h3 className='text-white text-lg font-semibold'>Newsletter</h3>
                        <form className='mt-4'>
                            <p className='text-white text-sm mb-2'>Signup for Latest Article</p>
                            <input className='!w-full bg-white text-primary_text outline-none' type="email" placeholder='Your Email Address' required />
                            <div className='flex items-center gap-2 w-full my-2'>
                                <input type="checkbox" className='!w-fit' />
                                <p className='text-zinc-400 text-sm'>I have read and agree to the terms & conditions</p>
                            </div>
                            <button className='btn !w-full text-sm'>
                                <span>Sign Up</span>
                                <span></span>
                            </button>

                        </form>
                    </div>
                </div>
            </div>

            <hr className='border-zinc-800 w-full inline-block' />

            <div className="content_area py-8 flex items-center gap-4">
                <div className='flex items-center gap-2 flex-1'>
                    <img className='w-14 h-14' src={assets.logo_white} alt="" />
                    <span className='text-white font-semibold text-2xl'>Corrent</span>
                </div>

                <div className='flex items-center justify-center gap-8 flex-1 text-white/80'>
                    <Link>Home</Link>
                    <Link>Property</Link>
                    <Link>Contact</Link>
                </div>

                <div className='flex-1 flex justify-end gap-2'>
                    <Link className='group w-[44px] h-[44px] flex items-center justify-center border border-zinc-600 rounded-full hover:bg-accent_blue hover:border-none text-white'>
                        <FaFacebookF className='text-zinc-500 group-hover:text-white' />
                    </Link>

                    <Link className='group w-[44px] h-[44px] flex items-center justify-center border border-zinc-600 rounded-full hover:bg-accent_blue hover:border-none text-white'>
                        <FaTwitter className='text-zinc-500 group-hover:text-white' />
                    </Link>

                    <Link className='group w-[44px] h-[44px] flex items-center justify-center border border-zinc-600 rounded-full hover:bg-accent_blue hover:border-none text-white'>
                        <FaLinkedinIn className='text-zinc-500 group-hover:text-white' />
                    </Link>
                    <Link className='group w-[44px] h-[44px] flex items-center justify-center border border-zinc-600 rounded-full hover:bg-accent_blue hover:border-none text-white'>
                        <BiLogoInstagramAlt className='text-zinc-500 text-lg group-hover:text-white' />
                    </Link>
                </div>
            </div>

            <hr className='border-zinc-800 w-full inline-block' />

            <p className='py-8 text-zinc-400'>Copyright © 2025. Designed & Developed</p>
        </section>
    )
}

export default Footer
