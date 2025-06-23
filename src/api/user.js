import ForgotPassword from "../pages/auth/ForgotPassword";
import axiosInstance from "../utils/axiosInstance";
import { ENDPOINTS } from "../utils/endpoint";

export const userApi = {
    update: async (data) => {
    try {
      const response = await axiosInstance.put(
        ENDPOINTS.USER.update,
        data
      );
      return response.data;
    } catch (error) {
      throw error || { message: "Failed to update users" };
    }
    },
    uploadImage: async (file) => {
      try {
        const formData = new FormData();
        formData.append("file", file); 

        const response = await axiosInstance.post(
          ENDPOINTS.USER.uploadImage,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        return response.data;
      } catch (error) {
        throw error?.response?.data || { message: "Failed to upload image" };
      }
    },
    mybookings: async (filters = {}) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.USER.bookings, {
        params: {
          // Pagination
          page: filters.page || 1,
          pageSize: filters.pageSize || 10,
          
          // Search filters
          search: filters.search || "",
          roomType: filters.roomType || "",
          
          // Date filters
          fromDate: filters.fromDate,
          toDate: filters.toDate,
          
          // Status filter (if you implement booking status)
          status: filters.status 
        },
      });
      
      return {
        success: true,
        data: response.data.data,
        pagination: response.data.pagination
      };
    } catch (error) {
      throw error?.response?.data || { 
        success: false,
        message: "Failed to fetch bookings" 
      };
    }
    },
    setting: async (data) => {
    try {
      const response = await axiosInstance.put(
        ENDPOINTS.USER.update,
        data
      );
      return response.data;
    } catch (error) {
      throw error || { message: "Failed to update users" };
    }
    },
    verifyOTP: async (data) => {
    try {
      const response = await axiosInstance.put(
        ENDPOINTS.USER.verifyOTP,
        {otp:data}
      );
      return response.data;
    } catch (error) {
      throw error || { message: "Failed to verify OTP" };
    }
    },
    resendOTP: async ()=>{
      try {
        const response = await axiosInstance.put(ENDPOINTS.USER.resendOTP)
        return response.data;
      } catch (error) {
        throw error || { message: "Failed to recend OTP" };
      }
    },
    forgotPassword: async (data) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.USER.forgotpassword,
        data
      );
      return response.data;
    } catch (error) {
      throw error || { message: "Failed to forgot-password users" };
    }
    },
    resetPassword: async (data) => {
    try {
      const response = await axiosInstance.put(
        ENDPOINTS.USER.resetPassword,
        data
      );
      return response.data;
    } catch (error) {
      throw error || { message: "Failed to update password" };
    }
    },

};