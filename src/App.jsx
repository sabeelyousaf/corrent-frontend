import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { authRoutes, tenantRoutes, userRoutes } from './routes/user';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LocomotiveScroll from 'locomotive-scroll';
import { useDispatch, useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import Loader from './components/Loader';
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { loadUser } from './redux/auth/authActions';
import ScrollToTop from './components/ScrollToTop';
import { propertyOwnerRoutes } from './routes/property_owner';
import PropertyOwnerSidebar from './components/PropertyOwnerSidebar';
import PrivateRoute from './components/PrivateRoute';
import PropertyDetails from './pages/landing/PropertyDetails';
const stripePromise = loadStripe("pk_test_51RPfqZ2aUC47vuEFt34ADy7HRM3tjgy9ttk6VW1Hbbne7u2yaZwd3Jdg7qWM4vqEdeSTbCi880J9ryu5lZh0jI8Z00OL3yLLQq");
const App = () => {
  const { isAuthenticated, loading, error, message } = useSelector((state) => state.auth);
  const scrollRef = useRef(null);
  const locoScrollRef = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
 useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        dispatch(loadUser());
    }
  }, [dispatch]);

  useEffect(() => {
    locoScrollRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      lerp: 0.1,
    });

    return () => {
      locoScrollRef.current?.destroy();
    };
  }, []);

  return (
     <Elements stripe={stripePromise}>
    <Router>
      <ScrollToTop locomotiveScrollRef={locoScrollRef} />
      <div id="main-scroll" data-scroll-container ref={scrollRef}>
          <>
            <Navbar isAuthenticated={isAuthenticated} user={user} />
            <Routes>
              {userRoutes.map((r, index) => (
                <Route key={index} path={r.path} element={<PrivateRoute isAuthenticated={isAuthenticated && user && user.role === "user" || !isAuthenticated}>
                  <r.element user={user} />
                </PrivateRoute>} />
              ))}
              {authRoutes.map((r, index) => (
                <Route
                  key={index}
                  path={r.path}
                  element={
                    <PublicOnlyRoute isAuthenticated={isAuthenticated} user={user}>
                      <r.element />
                    </PublicOnlyRoute>
                  }
                />
              ))}

               {propertyOwnerRoutes.map((r, index) => (
                <Route key={index} path={r.path} element={<PrivateRoute  isAuthenticated={isAuthenticated && user && user.role === "property_owner"} redirect={"/"} >
                  <PropertyOwnerSidebar user={user} component={r.element} title={r.title} />
                </PrivateRoute>} />
              ))}

              {tenantRoutes.map((r, index) => (
                <Route key={index} path={r.path} element={<r.element user={user} />} />
              ))}

              <Route path="/property/:roomId" element={<PropertyDetails />} />

            </Routes>
            <Footer isAuthenticated={isAuthenticated} user={user} />
          </>
        <Toaster />
      </div>
    </Router>
     </Elements>
  );
};

export default App;
