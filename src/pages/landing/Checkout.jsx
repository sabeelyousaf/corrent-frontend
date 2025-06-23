import React, {useState, useEffect} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import {format} from 'date-fns';
import {bookingApi} from '../../api/booking';

const CheckoutPage = () => {
  const [formData, setFormData] = useState ({
    name: 'Olivia Rodriguez',
    email: 'olivia@untitledul.com',
    phoneNo: '+1 (555) 000-0000',
    checkIn: '2024-02-01',
    checkOut: '2024-03-25',
    comingAlone: true,
    studyOrWork: false,
    university: '',
    description: '',
  });

  const [promoCode, setPromoCode] = useState ('3XSP5INXLAN');
  const [isProcessing, setIsProcessing] = useState (false);
  const [bookingSuccess, setBookingSuccess] = useState (false);
  const [datePickerOpen, setDatePickerOpen] = useState (false);
  const stripe = useStripe ();
  const elements = useElements ();

  // Dummy room details
  const roomDetails = {
    id: 'room123',
    title: 'Zoom 7 in Casa Monteiro II',
    location: 'Domozcarro Monteiro, TITO Lisboa',
    pricePerNight: 1200, // $12.00 per night
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
    ],
  };

  const handleChange = e => {
    const {name, value, type, checked} = e.target;
    setFormData (prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault ();

    if (!stripe || !elements) return;

    setIsProcessing (true);

    try {
      const cardElement = elements.getElement (CardElement);

      const {
        paymentMethod,
        error: stripeError,
      } = await stripe.createPaymentMethod ({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: formData.name,
          email: formData.email,
          phone: formData.phoneNo,
        },
      });

      if (stripeError) throw new Error (stripeError.message);

      const payload = {
        roomId: roomDetails.id,
        paymentMethodId: paymentMethod.id,
        bookingDetails: {
          ...formData,
          checkIn: new Date (formData.checkIn).toISOString (),
          checkOut: new Date (formData.checkOut).toISOString (),
        },
        promoCode,
        amount: prices.total * 100,
      };

      // Axios-style: no need for .json()
      const response = await bookingApi.create (
        payload,
        '68585052eb318dac327f164f'
      );
      const result = response.success;

      if (result === true) {
        setBookingSuccess (true);
      } else {
        throw new Error (result.error || 'Booking failed');
      }
    } catch (err) {
      console.error ('Payment error:', err.message);
      alert (`Payment failed: ${err.message}`);
    } finally {
      setIsProcessing (false);
    }
  };

  // Calculate prices
  const calculatePrices = () => {
    if (!formData.checkIn || !formData.checkOut || !roomDetails) {
      return {
        monthly: 0,
        bills: 0,
        fee: 0,
        subtotal: 0,
        total: 0,
        nights: 0,
      };
    }

    const nights = Math.ceil (
      (new Date (formData.checkOut) - new Date (formData.checkIn)) /
        (86400 * 1000)
    );

    const monthly = roomDetails.pricePerNight * nights / 100;
    const bills = 120; // Fixed bills cost
    const fee = 49; // Fixed service fee
    const subtotal = monthly + bills;
    const total = subtotal + fee;

    return {
      monthly,
      bills,
      fee,
      subtotal,
      total,
      nights,
    };
  };

  const prices = calculatePrices ();

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br py-32 from-blue-50 to-indigo-100 py-12 px-4 ">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6">
                <svg
                  className="w-16 h-16 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-medium  mb-2">
                Booking Confirmed!
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Your booking for
                {' '}
                {roomDetails.title}
                {' '}
                has been successfully confirmed. A confirmation email has been sent to
                {' '}
                {formData.email}
                .
              </p>

              <div className="bg-gray-50 rounded-xl p-6 max-w-md mx-auto border border-gray-200">
                <h3 className="font-semibold text-lg  mb-4 text-center">
                  Booking Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Room:</span>
                    <span className="font-medium">{roomDetails.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dates:</span>
                    <span className="font-medium">
                      {format (new Date (formData.checkIn), 'dd MMM, yyyy')}
                      {' '}
                      -
                      {' '}
                      {format (new Date (formData.checkOut), 'dd MMM, yyyy')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total:</span>
                    <span className="font-medium text-blue-600">
                      ${prices.total.toFixed (2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reference:</span>
                    <span className="font-medium">
                      BK-{Math.floor (100000 + Math.random () * 900000)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setBookingSuccess (false);
                  window.location.href = '/';
                }}
                className="mt-8 px-6 py-3 btn text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Another Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br py-40   px-4">
      <div className="max-w-8xl mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Information */}
          <div className="bg-white p-8 rounded-xl border-1 border-gray-300">
            <h2 className="text-xl font-medium mb-6 pb-2 ">
              1. Contact Information
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telephone number
                </label>
                <input
                  type="tel"
                  name="phoneNo"
                  required
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            <h2 className="text-xl mt-10 font-medium mb-6 pb-2 ">
              2. Room Application Form
            </h2>

            <div className="space-y-8">
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Are you coming alone?
                </p>
                <div className="flex space-x-8">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="comingAlone"
                      checked={formData.comingAlone}
                      onChange={() =>
                        setFormData ({...formData, comingAlone: true})}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 text-lg">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="comingAlone"
                      checked={!formData.comingAlone}
                      onChange={() =>
                        setFormData ({...formData, comingAlone: false})}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 text-lg">No</span>
                  </label>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Do you study or work?
                </p>
                <div className="flex space-x-8">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="studyOrWork"
                      checked={!formData.studyOrWork}
                      onChange={() =>
                        setFormData ({...formData, studyOrWork: false})}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 text-lg">Work</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="studyOrWork"
                      checked={formData.studyOrWork}
                      onChange={() =>
                        setFormData ({...formData, studyOrWork: true})}
                      className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700 text-lg">Study</span>
                  </label>
                </div>

              </div>

              {formData.studyOrWork === 'study' &&
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    At which university do you study?
                  </label>
                  <select
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select university</option>
                    <option value="Harvard University">
                      Harvard University
                    </option>
                    <option value="Stanford University">
                      Stanford University
                    </option>
                    <option value="MIT">
                      Massachusetts Institute of Technology
                    </option>
                    <option value="University of Oxford">
                      University of Oxford
                    </option>
                  </select>
                </div>}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about yourself
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter a description..."
                />
              </div>
            </div>
          </div>

          {/* Right Column - Room Details and Payment */}
          <div className="bg-white p-8 rounded-xl  border-1 border-gray-300">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-xl font-medium ">
                  {roomDetails.title}
                </h2>
                <p className="text-gray-600 flex items-center mt-2">
                  <span className="mr-2">📍</span> {roomDetails.location}
                </p>
              </div>

            </div>

            <div className="flex justify-between py-5 border-t border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Check In</p>
                <p className="font-medium text-lg">
                  {format (new Date (formData.checkIn), 'dd MMM, yyyy')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Check Out</p>
                <p className="font-medium text-lg">
                  {format (new Date (formData.checkOut), 'dd MMM, yyyy')}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-medium  mb-5">
                Price Details
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly (for 1 Person)</span>
                  <span>${prices.monthly.toFixed (2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Bills (Gas, Media, CleanUp)
                  </span>
                  <span>${prices.bills.toFixed (2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fee</span>
                  <span>${prices.fee.toFixed (2)}</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-gray-200 font-medium text-lg">
                  <span>Total</span>
                  <span className="text-blue-600">
                    ${prices.total.toFixed (2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Promo Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={promoCode}
                  onChange={e => setPromoCode (e.target.value)}
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-l-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter promo code"
                />
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-800 text-white rounded-r-xl hover:bg-gray-700 transition-colors"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-medium  mb-5">
                Payment Information
              </h3>
              <div className="border border-gray-300 rounded-xl p-5">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isProcessing || !stripe}
              className="w-full mt-8 py-4 btn text-white font-bold text-lg rounded-xl hover:opacity-90 transition-opacity disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing
                ? <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing Payment...
                  </div>
                : `Pay $${prices.total.toFixed (2)}`}
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Your payment is securely processed by Stripe. We do not store your card details.
            </p>
          </div>
        </div>

        {/* Hidden form inputs for functionality */}
        <div className="hidden">
          <input
            type="date"
            name="checkIn"
            required
            value={formData.checkIn}
            onChange={handleChange}
          />
          <input
            type="date"
            name="checkOut"
            required
            value={formData.checkOut}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default function App () {
  return (
    <div>
      <CheckoutPage />
    </div>
  );
}
