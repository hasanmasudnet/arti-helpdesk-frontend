import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("access_token") || "";

console.log(token, "access_token sss");

export const apiInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  // baseURL: "https://phplaravel-1241841-5214027.cloudwaysapps.com/api",
  headers: {
    Authorization: `Bearer ${token.replace(/"/g, "")}`,
  },
});
