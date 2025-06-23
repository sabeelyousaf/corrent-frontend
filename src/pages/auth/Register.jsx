import React, {useState} from 'react';
import {assets} from '../../../constants';
import LogoAccent from '../../components/LogoAccent';
import {useDispatch} from 'react-redux';
import {register} from '../../redux/auth/authActions';
import {Link, redirect, useNavigate} from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState ('');
  const [firstName, setFirstName] = useState ('');
  const [lastName, setLastName] = useState ('');

  const [password, setPassword] = useState ('');
  const dispatch = useDispatch ();
  const navigate = useNavigate ();
  const submitHandler = e => {
    e.preventDefault ();
    dispatch (register (firstName, lastName, email, password));
  };
  return (
    <div className="container mx-auto py-5 px-10">
      <section className="w-full h-screen grid grid-col-1 lg:grid-cols-2 ">
        <div className="w-full md:w-[60%] mx-auto">

          <div className="w-full flex flex-row items-center  justify-between">
            <LogoAccent />
            <a href="/" className="text-accent_blue font-medium text-sm">
              Back To Home
            </a>
          </div>

          <form action="" onSubmit={submitHandler}>
            <div className="mb-4 mt-12">
              <h2 className="text-3xl mb-3 font-semibold text-accent_blue_dark">
                Signup
              </h2>

            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="">
                <span className="text-sm font-medium text-primary_text inline-block mb-1">
                  Name
                </span>
                <input
                  value={firstName}
                  onChange={e => setFirstName (e.target.value)}
                  type="text"
                  placeholder="Enter Your First Name"
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
                />
              </label>

              <label htmlFor="">
                <span className="text-sm font-medium text-primary_text inline-block mb-1">
                  Confirm Password
                </span>
                <input type="password" placeholder="Confirm Your Password" />
              </label>

              <button className="btn">Register</button>
              <button className="w-full border border-zinc-300  rounded-lg p-3 flex items-center gap-2 justify-center">
                <span>
                  <img className="w-4" src={assets.google} alt="" />
                </span>
                <span className="font-medium">Sign in With Google</span>
              </button>

              {/* <button className="w-full border border-zinc-300  rounded-lg p-3 flex items-center gap-2 justify-center">
              <span>
                <img className="w-4" src={assets.facebook} alt="" />
              </span>
              <span className="font-medium">Sign in With Facebook</span>
            </button> */}
            </div>

            <p className="text-sm text-center mt-2 text-zinc-600">
              Already Have Account?
              {' '}
              <Link to="/login" className="text-accent_blue font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
        <div className="flex-1 h-full  overflow-hidden">
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
