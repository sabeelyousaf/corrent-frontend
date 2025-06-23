import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import CountrySelect from '../../components/CountrySelect';
import LogoAccent from '../../components/LogoAccent';
import { userApi } from '../../api/user';

const ForgotPassword = () => {
  const [step, setStep] = useState('email'); 
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await userApi.forgotPassword({ email });
      setStep('reset');
      setSuccessMessage(`OTP sent to ${email}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Password validation
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      const payload = { 
        email, 
        otp, 
        newPassword 
      };
      
      const res = await userApi.resetPassword(payload);
      setSuccessMessage('Password reset successful! You can now login with your new password.');
      // Clear form or redirect after successful reset
      setNewPassword('');
      setConfirmPassword('');
      setOtp('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full h-screen flex items-center gap-8 p-8">
      <div className="flex-1 max-w-[500px] h-full relative flex flex-col justify-center">
        <div className="w-full absolute top-0 left-0 flex items-center justify-between">
          <LogoAccent />
        </div>
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {step === 'email' ? (
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-accent_blue_dark">
                Recover Your Password
              </h2>
              <p className="text-sm text-zinc-600">
                Enter Your Registered Email.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <label>
                <span className="text-sm font-medium text-primary_text inline-block mb-1">
                  Email
                </span>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full p-3 border rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <button 
                className="w-full btn"
                disabled={loading}
              >
                {loading ? 'Sending OTP...' : 'Next Step'}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-accent_blue_dark">
                Reset Password
              </h2>
              <p className="text-sm text-zinc-600">
                Enter OTP sent to your email and new password
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <label>
                <span className="text-sm font-medium text-primary_text inline-block mb-1">
                  OTP Code
                </span>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  className="w-full p-3 border rounded-md"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
              </label>
              
              <label>
                <span className="text-sm font-medium text-primary_text inline-block mb-1">
                  New Password
                </span>
                <input
                  type="password"
                  placeholder="Create new password"
                  className="w-full p-3 border rounded-md"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </label>
              
              <label>
                <span className="text-sm font-medium text-primary_text inline-block mb-1">
                  Confirm Password
                </span>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full p-3 border rounded-md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={6}
                  required
                />
              </label>
              
              <button 
                className="w-full btn"
                disabled={loading}
              >
                {loading ? 'Resetting Password...' : 'Reset Password'}
              </button>
              
              <button
                type="button"
                className="text-blue-500 text-sm mt-2"
                onClick={() => setStep('email')}
              >
                Back to Email Entry
              </button>
            </div>
          </form>
        )}
      </div>
      
      <div className="flex-1 h-full bg-red-50 rounded-lg overflow-hidden">
        <img
          className="w-full h-[95vh] rounded-lg object-center object-cover"
          src="/src/assets/images/banners/forgetbanner.jpg"
          alt="Password recovery"
        />
      </div>
    </section>
  );
};

export default ForgotPassword;