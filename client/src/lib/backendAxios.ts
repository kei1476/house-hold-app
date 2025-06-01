import axios from "axios";

export const backendAxios = axios.create({
  baseURL: process.env.REACT_APP_WEB_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 5000,
})