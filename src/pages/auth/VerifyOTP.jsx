import {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import LogoAccent from '../../components/LogoAccent';
import {useDispatch, useSelector} from 'react-redux';
import {verifyEmail} from '../../redux/auth/authActions';
import {userApi} from '../../api/user';
import toast from 'react-hot-toast';

const VerifyOTP = () => {
  const dispatch = useDispatch ();
  const navigate = useNavigate ();
  const {loading, message, error} = useSelector (state => state.auth);

  const [otp, setOtp] = useState (Array (6).fill (''));
  const [resendTime, setResendTime] = useState (0);
  const inputRefs = useRef ([]);

  // Focus first input on mount
  useEffect (() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus ();
    }
  }, []);

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (/^\d*$/.test (value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp (newOtp);

      // Auto focus next input
      if (value && index < 5 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1].focus ();
      }
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp (newOtp);
      inputRefs.current[index - 1].focus ();
    }
  };

  // Submit OTP for verification
  const verifyOTP = async () => {
    const otpCode = otp.join ('');
    if (otpCode.length === 6) {
      try {
        const res = await userApi.verifyOTP (otpCode);
        console.log (res);
        toast.success ('Email has been verified successfully');
        setTimeout(() => {
         window.location.href = '/';
        }, 3000);
      } catch (err) {
        console.error ('OTP verification failed:', err);
        toast.error (err?.response?.data?.message);
      }
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    if (resendTime > 0) return;

    try {
      await userApi.resendOTP ();
      setResendTime (60);
      toast.success ('Email has been resend successfully');
    } catch (err) {
      console.error ('Resend failed:', err);
    }
  };

  // Resend countdown timer
  useEffect (
    () => {
      let timer;
      if (resendTime > 0) {
        timer = setTimeout (() => setResendTime (resendTime - 1), 1000);
      }
      return () => clearTimeout (timer);
    },
    [resendTime]
  );

  return (
    <section className="w-full h-screen flex items-center gap-8 p-8">
      <div className="flex-1 max-w-[500px] h-full relative flex flex-col justify-center">
        <div className="w-full absolute top-0 left-0 flex items-center justify-between">
          <LogoAccent />
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-accent_blue_dark text-center mb-2">
            Verify Your Email
          </h2>
          <p className="text-center text-zinc-600 text-sm mb-8">
            Enter the 6-digit code sent to your email
          </p>

          {/* OTP Input Fields */}
          <div className="flex justify-center space-x-3 mb-8">
            {otp.map ((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={e => handleChange (index, e.target.value)}
                onKeyDown={e => handleKeyDown (index, e)}
                ref={el => (inputRefs.current[index] = el)}
                disabled={loading}
                className="w-12 h-12 border border-gray-300 rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-accent_blue"
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={verifyOTP}
            disabled={loading || otp.join ('').length !== 6}
            className={`w-full py-3 px-4 rounded-md text-white font-medium ${loading || otp.join ('').length !== 6 ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent_blue hover:bg-accent_blue_dark'}`}
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>

          {/* Resend OTP */}
          <div className="text-center mt-6">
            <p className="text-zinc-600 text-sm">
              Didn't receive the code?{' '}
              <button
                onClick={handleResend}
                disabled={resendTime > 0}
                className={`font-medium ${resendTime > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-accent_blue hover:text-accent_blue_dark'}`}
              >
                {resendTime > 0 ? `Resend in ${resendTime}s` : 'Resend Code'}
              </button>
            </p>
          </div>
        </div>

        {/* Status Messages */}
        <div className="mt-8 text-center">
          {message &&
            <div className="text-green-600">
              <p>{message}</p>
              <p className="text-sm">Redirecting to login...</p>
            </div>}

          {error && <p className="text-red-600">{error}</p>}
        </div>
      </div>

      <div className="flex-1 h-full bg-red-50 rounded-lg overflow-hidden">
        <img
          className="w-full h-full object-center object-cover"
          src="https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>
    </section>
  );
};

export default VerifyOTP;
