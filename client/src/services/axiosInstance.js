
import axios from 'axios';
const apiKey = process.env.REACT_APP_AUTHORIZATION_TOKEN;

const axiosInstance = axios.create({
  baseURL: 'https://api-app-staging.wobot.ai/app/v1/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization':apiKey
  },
});

export default axiosInstance;
