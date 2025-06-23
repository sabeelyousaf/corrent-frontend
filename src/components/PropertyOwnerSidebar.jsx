import React, {useState, useRef, useEffect} from 'react';
import LogoAccent from './LogoAccent';
import {GoHome} from 'react-icons/go';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {VscGraphLine} from 'react-icons/vsc';
import {FaRegStickyNote} from 'react-icons/fa';
import {LuCircleDollarSign} from 'react-icons/lu';
import {IoLayersOutline} from 'react-icons/io5';
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
            to={'/property-owner/dashboard'}
            className={`w-full flex items-center gap-2 p-2.5 rounded-sm hover:bg-accent_blue/20 hover:text-accent_blue_dark hover:font-medium duration-200 ease-in ${isActive ('/property-owner/dashboard') ? 'bg-accent_blue text-white' : ''}`}
          >
            <span>
              <GoHome
                className={`text-xl text-accent_red ${isActive ('/property-owner/dashboard') ? 'text-white' : ''}`}
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
                  path: '/property-owner/metrics',
                  icon: VscGraphLine,
                  label: 'Metrics',
                },
                {
                  path: '/property-owner/manage',
                  icon: FaRegStickyNote,
                  label: 'Manage',
                },
                {
                  path: '/property-owner/earnings',
                  icon: LuCircleDollarSign,
                  label: 'Earnings',
                },
                {
                  path: '/property-owner/resources',
                  icon: IoLayersOutline,
                  label: 'Resources',
                },
                {
                  path: '/property-owner/refer-host',
                  icon: LuUserSearch,
                  label: 'Refer a Host',
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
            <Link>
              <IoChatboxEllipses className="text-xl text-zinc-800" />
            </Link>
            <Link>
              <IoMdNotifications className="text-xl text-zinc-800" />
            </Link>

            <div className="relative" ref={dropdownRef}>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setDropdownOpen (prev => !prev)}
              >
                <img
                  src={user?.avatar?.secure_url}
                  alt=""
                  className="rounded-full h-10 w-10"
                />
                <div>
                  <p className="text-sm">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs font-medium text-accent_blue">
                    Property Owner
                  </p>
                </div>
              </div>
              {dropdownOpen &&
                <div className="absolute right-0 mt-2 w-[220px] p-4 bg-white shadow-md rounded-md z-50">

                  <div className="flex items-center gap-2 border-b border-zinc-200 pb-4">
                   <img
                  src={user?.avatar?.secure_url}
                  alt=""
                  className="rounded-full h-10 w-10"
                />
                    <div>
                      <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                      <span className="text-xs text-zinc-600 font-medium">
                   {user?.email}
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/property-owner/settings"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setDropdownOpen (false)}
                  >
                    <span />
                    <span>Settings</span>
                  </Link>

                  <button
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>}
            </div>
          </div>
        </div>

        <Component />
      </div>
    </section>
  );
};

export default PropertyOwnerSidebar;
