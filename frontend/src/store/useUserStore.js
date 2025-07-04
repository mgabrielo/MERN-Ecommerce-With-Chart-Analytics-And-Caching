import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../config/axiosInstance";
import { toast } from "react-hot-toast";

export const useUserStore = create(
  persist((set, get) => ({
    user: null,
    loading: false,
    checkingAuth: true,

    signup: async ({ name, email, password, confirmPassword }) => {
      set({ loading: true });
      if (password !== confirmPassword) {
        set({ loading: false });
        return toast.error("Passwords do not match");
      }
      try {
        const { data } = await axios.post("/auth/signup", {
          name,
          email,
          password,
        });
        set({ user: data.user, loading: false });
      } catch (error) {
        set({ loading: false, user: null });
        toast.error(
          error?.response?.data?.message || "Error occurred in sign up request"
        );
      }
    },
    login: async ({ email, password }) => {
      set({ loading: true });

      try {
        const { data } = await axios.post("/auth/login", {
          email,
          password,
        });
        set({ user: data.user, loading: false });
      } catch (error) {
        set({ loading: false, user: null });
        toast.error(
          error?.response?.data?.message || "Error occurred in log in request"
        );
      }
    },
    checkAuth: async () => {
      set({ checkingAuth: true });
      try {
        const { data } = await axios.get("/auth/profile");
        set({ checkingAuth: false, user: data.user });
      } catch (error) {
        set({ checkingAuth: false, user: null });
      }
    },
    logout: async () => {
      try {
        set({ user: null });
        await axios.get("/auth/logout");
      } catch (error) {
        set({ user: null });
      }
    },
    refreshToken: async () => {
      if (get().checkingAuth) {
        return;
      }
      set({ checkingAuth: true });
      try {
        const response = await axios.post("/auth/refresh-token");
        set({ checkingAuth: false });
        return response.data;
      } catch (error) {
        set({ user: null, checkingAuth: false });
        console.log(error);
      }
    },
  }))
);

let refreshPromise = null;
let refreshLock = false;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (refreshLock) {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return axios(originalRequest);
      }

      refreshLock = true;
      try {
        if (refreshPromise) {
          await refreshPromise;
        } else {
          refreshPromise = useUserStore.getState().refreshToken();
          await refreshPromise;
          refreshPromise = null;
        }
        refreshLock = false;
        return axios(originalRequest);
      } catch (RefreshError) {
        useUserStore.getState().logout();
        refreshLock = false;
        return Promise.reject(RefreshError);
      }
    }
    return Promise.reject(error);
  }
);
