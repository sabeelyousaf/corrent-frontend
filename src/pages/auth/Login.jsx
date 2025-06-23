import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import toast from 'react-hot-toast';
import {assets} from '../../../constants';
import LogoAccent from '../../components/LogoAccent';
import {login} from '../../redux/auth/authActions';
import {Link} from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState ({
    email: '',
    password: '',
    remember: false,
  });
  const [errors, setErrors] = useState ({});
  const [loading, setLoading] = useState (false);
  const dispatch = useDispatch ();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim ()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test (formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors (newErrors);
    return Object.keys (newErrors).length === 0;
  };

  const handleChange = e => {
    const {name, value, type, checked} = e.target;
    setFormData (prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors (prev => ({...prev, [name]: ''}));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault ();

    if (!validateForm ()) return;

    setLoading (true);

    try {
      await dispatch (login (formData.email, formData.password));
      // Reset form on successful login
      setFormData ({email: '', password: '', remember: false});
    } catch (error) {
    } finally {
      setLoading (false);
    }
  };

  const handleSocialLogin = provider => {
    toast.info (`Sign in with ${provider} is not implemented yet`);
    // Add actual social login implementation here
  };

  return (
    <div className="container mx-auto py-5 px-10">
      <section className="w-full h-screen grid grid-col-1 lg:grid-cols-2 ">
        <div className="w-full md:w-[60%] mx-auto">
          <div className="w-full   flex items-center justify-between">
            <LogoAccent />
            <a href="/" className="text-accent_blue font-medium text-sm">
              Back To Home
            </a>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 mt-20">
              <h2 className="text-3xl font-semibold text-accent_blue_dark">
                Login
              </h2>

            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label htmlFor="email">
                  <span className="text-sm font-medium text-primary_text inline-block mb-1">
                    Email
                  </span>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Enter Your Email"
                    className={`${errors.email ? 'border-red-500' : ''}`}
                  />
                </label>
                {errors.email &&
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="password">
                  <span className="text-sm font-medium text-primary_text inline-block mb-1">
                    Password
                  </span>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="Enter Your Password"
                    className={`${errors.password ? 'border-red-500' : ''}`}
                  />
                </label>
                {errors.password &&
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </p>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <input
                    name="remember"
                    type="checkbox"
                    checked={formData.remember}
                    onChange={handleChange}
                    className="!w-fit"
                  />
                  <p>Remember for 30 Days</p>
                </div>
                <a
                  href="/forgot-password"
                  className="text-sm font-medium text-accent_blue"
                >
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="btn" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>

              <button
                type="button"
                className="w-full border border-zinc-300 rounded-lg p-3 flex items-center gap-2 justify-center"
                onClick={() => handleSocialLogin ('Google')}
              >
                <span>
                  <img className="w-4" src={assets.google} alt="Google" />
                </span>
                <span className="font-medium">Sign in With Google</span>
              </button>

              {/* <button
              type="button"
              className="w-full border border-zinc-300 rounded-lg p-3 flex items-center gap-2 justify-center"
              onClick={() => handleSocialLogin ('Facebook')}
            >
              <span>
                <img className="w-4" src={assets.facebook} alt="Facebook" />
              </span>
              <span className="font-medium">Sign in With Facebook</span>
            </button> */}
            </div>

            <p className="text-sm text-center mt-2 text-zinc-600">
              Dont Have Account?
              {' '}
              <Link to="/register" className="text-accent_blue font-medium">
                Sign up
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

export default Login;
