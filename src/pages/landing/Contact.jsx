import React, {useState} from 'react';

export default function Contact () {
  const [formData, setFormData] = useState ({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState ({});
  const [isSubmitting, setIsSubmitting] = useState (false);
  const [submitSuccess, setSubmitSuccess] = useState (false);

  const handleChange = e => {
    const {name, value} = e.target;
    setFormData (prev => ({...prev, [name]: value}));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors (prev => ({...prev, [name]: ''}));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim ()) newErrors.name = 'Name is required';
    if (!formData.email.trim ()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test (formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.subject.trim ()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim ()) newErrors.message = 'Message is required';

    setErrors (newErrors);
    return Object.keys (newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault ();

    if (validate ()) {
      setIsSubmitting (true);

      // Simulate API call
      setTimeout (() => {
        console.log ('Form submitted:', formData);
        setIsSubmitting (false);
        setSubmitSuccess (true);
        setFormData ({name: '', email: '', subject: '', message: ''});

        // Reset success message after 5 seconds
        setTimeout (() => setSubmitSuccess (false), 5000);
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br py-34 from-indigo-50 to-blue-100  px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-medium text-gray-900 sm:text-5xl mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or want to work together? We'd love to hear from you!
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Contact Form */}
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="Your name"
                  />
                  {errors.name &&
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email &&
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="How can we help?"
                  />
                  {errors.subject &&
                    <p className="mt-1 text-sm text-red-500">
                      {errors.subject}
                    </p>}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message &&
                    <p className="mt-1 text-sm text-red-500">
                      {errors.message}
                    </p>}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full btn`}
                  >
                    {isSubmitting
                      ? <span className="flex items-center justify-center">
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
                          Sending...
                        </span>
                      : 'Send Message'}
                  </button>
                </div>

                {submitSuccess &&
                  <div className="rounded-xl bg-green-50 p-4 text-green-700 border border-green-200 transition-all duration-300 animate-pulse">
                    <p className="font-medium">✅ Message sent successfully!</p>
                    <p className="text-sm mt-1">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>}
              </form>
            </div>

            {/* Contact Info */}
            <div className="w-full md:w-1/2 bg-gradient-to-br bg-primary text-white p-8 md:p-12">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>

                  <div className="space-y-5">
                    <div className="flex items-start">
                      <div className="flex-shrink-0  p-3 rounded-2xl">
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
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">Phone</h3>
                        <p className="mt-1 text-blue-100">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0  p-3 rounded-2xl">
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
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">Email</h3>
                        <p className="mt-1 text-blue-100">
                          info@corrent.com
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0  p-3 rounded-2xl">
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
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">Office</h3>
                        <p className="mt-1 text-blue-100">
                          123 Innovation Street<br />
                          Tech City, TC 10001
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-3xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Find Us on Map
          </h2>
          <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184133404672!2d-73.98757472417112!3d40.75802897138801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1658782343650!5m2!1sen!2sus"
              className="w-full h-96 border-0 rounded-xl"
              allowFullScreen
              loading="lazy"
              title="Office Location Map"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
