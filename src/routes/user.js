import ChangePassword from "../pages/auth/ChangePassword";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Login from "../pages/auth/Login";
import NextStep from "../pages/auth/NextStep";
import Profile from "../pages/auth/Profile";
import Register from "../pages/auth/Register";
import VerifyOTP from "../pages/auth/VerifyOTP";
import AfterSearch from "../pages/landing/AfterSearch";
import CheckoutPage from "../pages/landing/Checkout";
import Home from "../pages/landing/Home";
import PropertyDetails from "../pages/landing/PropertyDetails";
import RoomApplication from "../pages/tennant/RoomApplication";

export const userRoutes = [
  {
    title: "Home",
    path: "/",
    element: Home,
  },

  {
    title: "After Search",
    path: "/search/:id",
    element: AfterSearch,
  },
  {
    title: "Properties",
    path: "/property",
    element: AfterSearch,
  },

  {
    title: "Property Details",
    path: "/property/:id",
    element: PropertyDetails,
  },
    {
    title: "checkout Details",
    path: "/checkout/:id",
    element: CheckoutPage,
  },
  {
    title: "Profile",
    path: "/account",
    element: Profile,
  },
    {
    title: "favorites",
    path: "/account",
    element: Profile,
  },
];

export const authRoutes = [
  {
    title: "Login",
    path: "/login",
    element: Login,
  },
  {
    title: "Register",
    path: "/register",
    element: Register,
  },
  {
    title: "Next Step",
    path: "/register/next-step",
    element: NextStep,
  },
  {
    title: "verify OTP",
    path: "/verify-otp",
    element: VerifyOTP,
  },
  {
    title: "Forgot Password",
    path: "/forgot-password",
    element: ForgotPassword,
  },
  {
    title: "Change Password",
    path: "/change-password/:token",
    element: ChangePassword,
  },
];

export const tenantRoutes = [
  {
    title: "Room Applications",
    path: "/tenant/room-applications",
    element: RoomApplication,
  },
];
