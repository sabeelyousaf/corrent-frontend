import React, { useState, useRef, useEffect } from 'react';
import { assets } from '../../constants';
import { IoIosArrowDown } from "react-icons/io";
import { Link } from 'react-router-dom';
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import { PiSignOutBold } from "react-icons/pi";
import { useDispatch } from 'react-redux';

const NavDropDown = ({ user }) => {
    
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
      <div ref={dropdownRef} className='relative'>
  <div
    onClick={() => setIsOpen(!isOpen)}
    className='border p-2 border-zinc-200 rounded-md flex items-center gap-2 cursor-pointer'
  >
    <img
      className='w-10 h-10 rounded-full object-cover object-center'
      src={user?.avatar?.secure_url || assets.avatarPlaceholder}
      alt=""
      onError={(e) => e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s"}
    />
    <p className='text-sm'>{user?.name}</p>
    <IoIosArrowDown />
  </div>

  {/* Dropdown Panel */}
  <div
    className={`w-[300px] absolute top-[65px] right-0 bg-white shadow-md rounded-md transition-all duration-200 ease-in-out overflow-hidden
      ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}
    `}
  >
    <ul>
      <li className='border-b border-zinc-300 p-3 flex items-center gap-2'>
        <img
          className='w-12 h-12 rounded-full object-cover object-center'
          src={user?.avatar?.secure_url}
          alt=""
          onError={(e) => e.target.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhtMRbtowke9ZnnGtyYJmIuJaB2Q1y5I-3IA&s"}
        />
        <div>
          <p className='text-base'>{user?.name}</p>
          <p className='text-sm text-zinc-500'>{user?.email}</p>
        </div>
      </li>

      <div className='p-3'>
        {[
          { label: "Account", icon: MdOutlineAccountCircle, path: "/account" },
          { label: "Room Applications", icon: FaWpforms, path: "/tenant/room-applications" },
          { label: "Ticket System", icon: FaWpforms, path: "/tenant/tickets" },

        ].map((r, index) => (
          <Link
            key={index}
            className="flex items-center gap-2 text-zinc-600 hover:bg-accent_blue/10 p-2 rounded-md hover:text-accent_blue_dark hover:font-medium"
            to={r.path}
            onClick={() => setIsOpen(false)}
          >
            <r.icon className='text-xl' />
            <span>{r.label}</span>
          </Link>
        ))}

        <button
          onClick={() => {
            setIsOpen(false);
            localStorage.removeItem('token');
            localStorage.removeItem('auth');
            localStorage.removeItem('persist:auth');
            window.location.href = "/";
          }}
          className="flex w-full cursor-pointer items-center gap-2 text-zinc-600 hover:bg-accent_blue/10 p-2 rounded-md hover:text-accent_blue_dark hover:font-medium"
        >
          <PiSignOutBold className='text-xl' />
          <span>Signout</span>
        </button>
      </div>
    </ul>
  </div>
</div>

    );
}

export default NavDropDown;
