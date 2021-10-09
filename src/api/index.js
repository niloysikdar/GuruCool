import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASEURL || 'http://localhost:5000';

const API = axios.create({ baseURL: baseUrl });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userdata')) {
    const token = JSON.parse(localStorage.getItem('userdata')).token;
    req.headers.authorization = `Bearer ${token}`;
  }

  return req;
});

export const login = (formData) => API.post('/auth/login', formData);

export const signup = (formData) => API.post('/auth/signup', formData);
