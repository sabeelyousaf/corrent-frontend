import React, {useState, useEffect} from 'react';
import {assets} from '../../../constants';
import LogoAccent from '../../components/LogoAccent';
import {useDispatch} from 'react-redux';
import {register} from '../../redux/auth/authActions';
import {Link, useNavigate} from 'react-router-dom';
import {motion, AnimatePresence} from 'framer-motion';

const Register = () => {
  const [showRoleModal, setShowRoleModal] = useState (true);
  const [userRole, setUserRole] = useState (null);
  const [email, setEmail] = useState ('');
  const [firstName, setFirstName] = useState ('');
  const [lastName, setLastName] = useState ('');
  const [password, setPassword] = useState ('');
  const dispatch = useDispatch ();
  const navigate = useNavigate ();

  useEffect (() => {
    // Automatically open modal on page load
    const role = localStorage.getItem ('registerRole');
    if (role) {
      setUserRole (role);
      setShowRoleModal (false);
    }
  }, []);

  const handleRoleSelect = role => {
    setUserRole (role);
    localStorage.setItem ('registerRole', role);
    setShowRoleModal (false);
  };

  const submitHandler = e => {
    e.preventDefault ();
    if (!userRole) {
      setShowRoleModal (true);
      return;
    }
    dispatch (register (firstName, lastName, email, password, userRole));
  };

  return (
    <div className="container mx-auto py-5 px-10">
      <AnimatePresence>
        {showRoleModal &&
          <motion.div
            key="modal-backdrop"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
          >
            <motion.div
              key="modal-content"
              initial={{scale: 0.8, y: 20}}
              animate={{scale: 1, y: 0}}
              exit={{scale: 0.8, opacity: 0}}
              className="bg-white rounded-xl p-8 max-w-md w-full mx-4 relative"
            >
              {/* Close button */}
              <button
                onClick={() => setShowRoleModal (false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <h2 className="text-2xl font-bold text-accent_blue_dark mb-6 text-center">
                What brings you here?
              </h2>

              <div className="flex flex-col gap-4">
                <motion.button
                  whileHover={{scale: 1.03}}
                  whileTap={{scale: 0.98}}
                  className="bg-accent_blue text-white py-3 px-6 rounded-lg font-medium text-lg"
                  onClick={() => handleRoleSelect ('property_owner')}
                >
                  I want to post properties
                </motion.button>

                <motion.button
                  whileHover={{scale: 1.03}}
                  whileTap={{scale: 0.98}}
                  className="bg-gray-100 text-accent_blue_dark py-3 px-6 rounded-lg font-medium text-lg border border-gray-200"
                  onClick={() => handleRoleSelect ('tenant')}
                >
                  I'm looking for a property
                </motion.button>
              </div>

              <button
                className="mt-6 text-gray-500 hover:text-gray-700 w-full text-center"
                onClick={() => navigate ('/')}
              >
                Back to Home
              </button>
            </motion.div>
          </motion.div>}
      </AnimatePresence>

      <section className="w-full h-screen grid grid-col-1 lg:grid-cols-2">
        <div className="w-full md:w-[60%] mx-auto">
          <div className="w-full flex flex-row items-center justify-between">
            <LogoAccent />
            <a href="/" className="text-accent_blue font-medium text-sm">
              Back To Home
            </a>
          </div>

          <form action="" onSubmit={submitHandler}>
            <div className="mb-4 mt-12">
              <h2 className="text-3xl mb-3 font-semibold text-accent_blue_dark">
                {userRole
                  ? `Signup as ${userRole === 'property_owner' ? 'Property Owner' : 'Tenant'}`
                  : 'Signup'}
              </h2>
              {!userRole &&
                <p className="text-red-500 text-sm mt-1">
                  Please select an account type to continue
                </p>}
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="">
                <span className="text-sm font-medium text-primary_text inline-block mb-1">
                  First Name
                </span>
                <input
                  value={firstName}
                  onChange={e => setFirstName (e.target.value)}
                  type="text"
                  placeholder="Enter Your First Name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent_blue"
                />
              </label>

              <label htmlFor="">
                <span className="text-sm font-medium text-primary_text inline-block mb-1">
                  Last Name
                </span>
                <input
                  value={lastName}
                  onChange={e => setLastName (e.target.value)}
                  type="text"
                  placeholder="Enter Your Last Name"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent_blue"
                />
              </label>

              <label htmlFor="">
                <span className="text-sm font-medium text-primary_text inline-block mb-1">
                  Email
                </span>
                <input
                  value={email}
                  onChange={e => setEmail (e.target.value)}
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent_blue"
                />
              </label>

              <label htmlFor="">
                <span className="text-sm font-medium text-primary_text inline-block mb-1">
                  Password
                </span>
                <input
                  value={password}
                  onChange={e => setPassword (e.target.value)}
                  type="password"
                  placeholder="Enter Your Password"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent_blue"
                />
              </label>

              <label htmlFor="">
                <span className="text-sm font-medium text-primary_text inline-block mb-1">
                  Confirm Password
                </span>
                <input
                  type="password"
                  placeholder="Confirm Your Password"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-accent_blue"
                />
              </label>

              <button className="btn bg-accent_blue text-white py-3 rounded-lg font-medium hover:bg-accent_blue_dark transition-colors">
                Register
              </button>

              <button
                type="button"
                className="text-sm text-accent_blue mt-2 cursor-pointer flex items-center justify-center gap-1"
                onClick={() => setShowRoleModal (true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Change account type
              </button>
              <p className="text-sm text-center mt-2 text-zinc-600">
                Already Have Account?
                {' '}
                <Link to="/login" className="text-accent_blue font-medium">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="flex-1 h-full overflow-hidden hidden md:block">
          <img
            className="w-full h-[95vh] rounded-lg object-center object-cover"
            src="/src/assets/images/banners/authbanner.jpg"
            alt=""
          />
        </div>
      </section>
    </div>
  );
};

export default Register;
