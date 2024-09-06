import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "/api",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json", //this line solved cors
  },
});