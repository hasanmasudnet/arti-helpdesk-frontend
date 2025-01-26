import axios from "axios";

const user = localStorage.getItem("user");
const token = JSON.parse(user)?.access_token || "";

export const apiInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    Authorization: token,
  },
});
