import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL =
  import.meta.env == "development"
    ? "http://localhost:5000"
    : "https://auth-mern-backend-dev-nischal.vercel.app";

// make sure to send cookies in header for auth token or credentials
axios.defaults.withCredentials = true;

/**
 * Create a authStore where create function will have access to 'set' state: {}
 * define store properties
 * define function to define properties, such as sign up and set(state) as per api calls
 * if error, set({error}) and throw it
 */
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  // login operation
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      set({ error: error.response.data.message });
    }
  },

  // signup operations
  signup: async (email, password, name) => {
    // intiate loading spinner as api is calling
    set({ isLoading: true, error: null });
    try {
      // POST api call to sign up with body: email, password, and name
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      // after response achieved, set the state to set({}) argument
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      // if error, set the error
      console.log(error);
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyMail: async (code) => {
    // intiate the loading and previous error to null, if any
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
      });

      // set the toast message
      toast.success("Email Verified Successfully!");
    } catch (error) {
      set({
        error: error.response.data.message || "Error Verifying Code",
        isLoading: false,
      });
      throw error;
    }
  },

  // check and set isCheckingAuth and isAuthenticated
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isCheckingAuth: false,
        isAuthenticated: true,
      });
    } catch (error) {
      // error is ignored because it will show in login: Unauthorized without login as error is registered, hence set null
      set({
        error: null,
        isCheckingAuth: false,
        isAuthenticated: false,
      });
    }
  },

  // logout operation
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.get(`${API_URL}/logout`);
      set({ isLoading: false, user: null, isAuthenticated: false });
    } catch (error) {
      set({ error: error.response.data.message });
    }
  },

  // FORGOT PASSWORD
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null, message: null });

    try {
      const response = await axios.post(`${API_URL}/forgot-password`, {
        email,
      });
      set({ message: response.data.message, isLoading: false });
    } catch (error) {
      set({
        error:
          error.response.data.message || "Error sending reset password email",
        isLoading: false,
      });
      throw error;
    }
  },

  // RESET PASSWORD
  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/reset-password/${token}`, {
        password,
      });
      set({ isLoading: false, message: response.data.message });
      console.log("All done");
    } catch (error) {
      set({ error: error.response.data.message, isLoading: false });
    }
  },
}));
