import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3002', // Base URL of your backend
  withCredentials: true, // Enable cookies for all requests
});

export default instance;
