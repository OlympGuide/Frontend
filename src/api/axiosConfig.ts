import axios from "axios";

// Determine the base URL based on the NODE_ENV value
const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://olympguide-backend.pm4.init-lab.ch/"
    : "http://localhost:3000/";

const apiClient = axios.create({
  baseURL: baseURL,
});

export { apiClient };
