import axios from "axios";
const token = localStorage.getItem("token");

export default axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});
