import React, { useState } from 'react';
import { navAndFooterHiddenRoutes } from '../../constants';
import { Link, useLocation } from 'react-router-dom';
import { TbHomeDollar } from "react-icons/tb";
import { FaRegUser, FaTimes, FaBars } from "react-icons/fa";
import LogoAccent from './LogoAccent';
import NavDropDown from './NavDropDown';
import {assets} from '../../constants';


const Navbar = ({ isAuthenticated, user }) => {
    const location = useLocation();
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const shouldHideNavbar = navAndFooterHiddenRoutes.includes(location.pathname) || 
                            (isAuthenticated && user?.role !== "user");

    const toggleOffcanvas = () => setShowOffcanvas(!showOffcanvas);
    const closeOffcanvas = () => setShowOffcanvas(false);

    const navLinks = [
        { title: "Home", path: "/" },
        { title: "Property", path: "/property" },
        { title: "Investment Tools", path: "/investment-tools" },
        { title: "Contact", path: "/contact" }
    ];


    return (
        <header className={`${shouldHideNavbar ? "hidden" : ""} w-full shadow-sm bg-white fixed top-0 left-0 z-30`}>
            <nav className='container mx-auto grid grid-cols-3 items-center gap-4 p-4'>
                {/* Logo */}
                <div className='flex items-center col-span-1'>
                    <Link to={'/'}>
                        <div className="logo flex items-center gap-2">
                          <img className="w-[30%]" src={assets.logo} alt="" />
                        </div>
                    </Link>
                </div>
                {/* Desktop Navigation */}
                <div className='hidden lg:flex items-center justify-center gap-8 col-span-1'>
                    {navLinks.map((r, index) => (
                        <Link 
                            to={r.path} 
                            key={index} 
                            className='text-secondary_text hover:text-accent_red hover:font-medium'
                        >
                            {r.title}
                        </Link>
                    ))}
                </div>
                {/* Desktop Auth Section */}
                <div className='hidden lg:flex items-center gap-4 justify-end col-span-1'>
                    {isAuthenticated ? (
                        <NavDropDown user={user} />
                    ) : (
                        <Link to={"/login"} className='flex items-center gap-2 cursor-pointer'>
                            <FaRegUser className='text-xl' />
                            <span>Register/Login</span>
                        </Link>
                    )}
                    <button className='btn !w-[180px] !h-[54px] flex items-center gap-4'>
                        <TbHomeDollar className='text-2xl' />
                        <span>Rent Property</span>
                    </button>
                </div>
                {/* Mobile Menu Button */}
                <button 
                    className="lg:hidden text-2xl text-gray-700 focus:outline-none"
                    onClick={toggleOffcanvas}
                    aria-label="Toggle menu"
                >
                    <FaBars />
                </button>
            </nav>
            {/* Full-width Mobile Offcanvas Menu */}
            <div className={`fixed inset-0 h-full w-full bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
                showOffcanvas ? 'translate-x-0' : 'translate-x-full'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Header with close button */}
                    <div className="flex justify-between items-center p-4 border-b">
                        <LogoAccent />
                        <button 
                            onClick={closeOffcanvas}
                            className="text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label="Close menu"
                        >
                            <FaTimes className="text-2xl" />
                        </button>
                    </div>
                    {/* Scrollable content area */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {/* Navigation Links */}
                        <div className="flex flex-col space-y-6">
                            {navLinks.map((r, index) => (
                                <Link 
                                    to={r.path} 
                                    key={index} 
                                    className='text-lg text-secondary_text hover:text-accent_red py-2 border-b border-gray-100'
                                    onClick={closeOffcanvas}
                                >
                                    {r.title}
                                </Link>
                            ))}
                        </div>

                        {/* Auth Section */}
                        <div className="pt-8 mt-4">
                            {isAuthenticated ? (
                                <div className="flex flex-col space-y-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                                        <div>
                                            <p className="font-medium">{user?.name}</p>
                                            <p className="text-sm text-gray-500">{user?.email}</p>
                                        </div>
                                    </div>
                                    <Link 
                                        to="/profile" 
                                        className="btn !justify-start !bg-transparent !text-gray-800 !border !border-gray-300"
                                        onClick={closeOffcanvas}
                                    >
                                        My Profile
                                    </Link>
                                    <button className="btn !justify-start !bg-transparent !text-gray-800 !border !border-gray-300">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link 
                                    to={"/login"} 
                                    className="flex items-center gap-3 text-lg py-3 border-b border-gray-100"
                                    onClick={closeOffcanvas}
                                >
                                    <FaRegUser className='text-xl' />
                                    <span>Register/Login</span>
                                </Link>
                            )}

                            <button className='btn !w-full !h-[54px] flex items-center gap-4 mt-8'>
                                <TbHomeDollar className='text-2xl' />
                                <span>Rent Property</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Backdrop for mobile menu */}
            {showOffcanvas && (
                <div 
                    className="fixed inset-0  bg-opacity-50 z-40 lg:hidden" 
                    onClick={closeOffcanvas}
                />
            )}
        </header>
    );
};

export default Navbar;