import axios from "axios";
import { BASE_API_URL } from "./utils";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});

export default axiosInstance;
