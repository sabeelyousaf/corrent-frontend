import axios from "axios";
import { server } from "../store";
import {
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutFail,
  logoutRequest,
  logoutSuccess,
  onboardingFail,
  onboardingRequest,
  onboardingSuccess,
  registerFail,
  registerRequest,
  registerSuccess,
  verifyEmailFail,
  verifyEmailRequest,
  verifyEmailSuccess,
} from "./authSlice";
import toast from "react-hot-toast";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    let { data } = await axios.post(
      `${server}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      }
    );
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    dispatch(loginSuccess(data));
     toast.success ('Login successful! Redirecting...');
  } catch (error) {
    console.log(error?.response?.data?.message,'error');
    
       toast.error (error?.response?.data?.message || 'Login failed. Please try again.');
    dispatch(loginFail(error.response?.data?.message || "Login failed"));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(loadUserFail("No token found"));
      return;
    }

    const { data } = await axios.get(`${server}/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      withCredentials: false,
    });
    
    localStorage.setItem("user", JSON.stringify(data.user));

    dispatch(loadUserSuccess(data));
  } catch (error) {
    dispatch(loadUserFail(error?.response?.data?.message || "Failed to load user"));
  }
};

export const register = (firstName, lastName, email, password) => async (dispatch) => {
  try {
    dispatch(registerRequest());

    const { data } = await axios.post(
      `${server}/register`,
      { firstName, lastName, email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    const authData = {
      token: data.token,
      user: data.user,
    };

    // Save in Redux
    dispatch(registerSuccess(authData));

    // Save in localStorage manually
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user);


    // Redirect to next step
     window.location.href = "/register/next-step";

  } catch (error) {
    dispatch(registerFail(error.response?.data?.message || "Registration failed"));
  }
};

export const onboard = (phone, nationality) => async (dispatch) => {
  try {
    dispatch(onboardingRequest());

    const token = localStorage.getItem("token");

    let { data } = await axios.put(
      `${server}/onboard`,
      { phone, nationality },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      }
    );

    dispatch(onboardingSuccess(data));
     window.location.href='/verify-otp';
  } catch (error) {
    dispatch(onboardingFail(error.response?.data?.message || "Onboarding failed"));
  }
};

export const verifyEmail = (token) => async (dispatch) => {
  try {
    dispatch(verifyEmailRequest());

    const { data } = await axios.put(
      `${server}/verify/${token}`,
      {},
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch(verifyEmailSuccess(data));
    return data;
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Email verification failed.";
    dispatch(verifyEmailFail(errorMessage));
    throw errorMessage;
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    localStorage.removeItem('token');
    dispatch(logoutSuccess(data));
    window.location.href="/"
  } catch (error) {
    dispatch(logoutFail(error.response.data.message));
  }
};

