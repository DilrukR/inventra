import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://13.60.250.124/',
});

export default axiosInstance;
