import axios from "axios";

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
const interceptor = (config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};
$authHost.interceptors.request.use(interceptor);

export { $host, $authHost };
