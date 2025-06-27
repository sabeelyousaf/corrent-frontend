import React, {useState, useRef, useEffect} from 'react';
import LogoAccent from './LogoAccent';
import {GoHome} from 'react-icons/go';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { VscGraphLine } from 'react-icons/vsc';
import { FaRegStickyNote, FaTools } from 'react-icons/fa';
import { LuCircleDollarSign, LuBot, LuMegaphone } from 'react-icons/lu';
import { IoLayersOutline, IoFlashOutline } from 'react-icons/io5';
import { MdOutlineCameraOutdoor, MdOutlineManageAccounts } from 'react-icons/md';
import { TbToolsKitchen2 } from 'react-icons/tb';
import {LuUserSearch} from 'react-icons/lu';
import {IoChatboxEllipses} from 'react-icons/io5';
import {IoMdNotifications} from 'react-icons/io';
import {assets} from '../../constants';
import {useDispatch} from 'react-redux';

const PropertyOwnerSidebar = ({component: Component, title, user}) => {
  const navigate = useNavigate ();

  const location = useLocation ();
  const [dropdownOpen, setDropdownOpen] = useState (false);
  const dropdownRef = useRef ();

  const isActive = path => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('token');
            localStorage.removeItem('auth');
            localStorage.removeItem('persist:auth');

    window.location.href = '/';
  };

  useEffect (() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains (event.target)) {
        setDropdownOpen (false);
      }
    };
    document.addEventListener ('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener ('mousedown', handleClickOutside);
    };
  }, []);

  const dispatch = useDispatch ();

  return (
    <section className="w-full min-h-screen bg-accent_blue/5 flex items-center gap-4">
      <div className="w-[300px] h-screen bg-white fixed top-0 left-0 p-4">
        <LogoAccent />

        <div className="my-8">
          <Link
            to={'/dashboard'}
            className={`w-full flex items-center gap-2 p-2.5 rounded-sm hover:bg-accent_blue/20 hover:text-accent_blue_dark hover:font-medium duration-200 ease-in ${isActive ('/dashboard') ? 'bg-accent_blue text-white' : ''}`}
          >
            <span>
              <GoHome
                className={`text-xl text-accent_red ${isActive ('/dashboard') ? 'text-white' : ''}`}
              />
            </span>
            <span>Dashboard</span>
          </Link>

          <ul className="my-2">
            <span className="text-sm font-medium text-accent_blue">
              Operations
            </span>

            <div className="my-1">
              {[
             {
    path: '/metrics',
    icon: VscGraphLine,
    label: 'Metrics',
  },
  {
    path: '/manage',
    icon: FaRegStickyNote,
    label: 'Manage',
  },
  {
    path: '/earnings',
    icon: LuCircleDollarSign,
    label: 'Earnings',
  },
  {
    path: '/resources',
    icon: IoLayersOutline,
    label: 'Resources',
  },
  {
    path: '/smart-locks',
    icon: MdOutlineCameraOutdoor,
    label: 'Smart Locks & Cameras',
  },
  {
    path: '/utilities-expense',
    icon: TbToolsKitchen2,
    label: 'Utilities & Expense',
  },
  {
    path: '/host-dashboard',
    icon: MdOutlineManageAccounts,
    label: 'Host Management',
  },
  {
    path: '/marketing-managment',
    icon: LuMegaphone,
    label: 'Marketing Management',
  },
  {
    path: '/ai-tools',
    icon: LuBot,
    label: 'AI Tools',
  },
              ].map ((r, index) => (
                <Link
                  to={r.path}
                  key={index}
                  className={`w-full flex items-center gap-2 p-2.5 rounded-sm hover:bg-accent_blue/20 hover:text-accent_blue_dark hover:font-medium duration-200 ease-in ${isActive (r.path) ? 'bg-accent_blue text-white' : ''}`}
                >
                  <span>
                    <r.icon
                      className={`text-xl ${isActive (r.path) ? 'text-white' : 'text-accent_red'}`}
                    />
                  </span>
                  <span className="text-sm font-medium">{r.label}</span>
                </Link>
              ))}
            </div>
          </ul>
        </div>
      </div>

      <div className="flex-1 min-h-screen ml-[316px] py-4 pr-4 flex flex-col items-start">
        <div className="header w-full p-4 bg-white rounded-md flex items-center justify-between mb-4">
          <h3 className="text-base font-medium">{title}</h3>

          <div className="flex items-center gap-3">
            <Link to="/chat">
              <IoChatboxEllipses className="text-xl text-zinc-800" />
            </Link>
            <Link to="/notifications">
              <IoMdNotifications className="text-xl text-zinc-800" />
            </Link>

          <div className="relative" ref={dropdownRef}>
  <div
    className="flex items-center gap-2 cursor-pointer"
    onClick={() => setDropdownOpen(prev => !prev)}
  >
    <img
      src={user?.avatar?.secure_url}
      alt="avatar"
      className="rounded-full h-10 w-10 object-cover"
    />
    <div className="hidden sm:block">
      <p className="text-sm truncate">{user?.firstName} {user?.lastName}</p>
      <p className="text-xs font-medium text-accent_blue truncate">Property Owner</p>
    </div>
  </div>

  {dropdownOpen && (
    <div className="absolute right-0 mt-2 min-w-[200px] max-w-[90vw] p-4 bg-white shadow-lg rounded-lg z-50 sm:w-[220px]">
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-4">
        <img
          src={user?.avatar?.secure_url}
          alt="avatar"
          className="rounded-full h-10 w-10 object-cover"
        />
        <div className="truncate">
          <p className="text-sm font-medium truncate">{user?.firstName} {user?.lastName}</p>
          <span className="text-xs text-zinc-600 font-medium truncate">{user?.email}</span>
        </div>
      </div>

      <Link
        to="/settings"
        className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
        onClick={() => setDropdownOpen(false)}
      >
        Settings
      </Link>

      <button
        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  )}
</div>

          </div>
        </div>

        <Component />
      </div>
    </section>
  );
};

export default PropertyOwnerSidebar;
