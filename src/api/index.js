import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASEURL || 'http://localhost:8000';

const API = axios.create({ baseURL: baseUrl });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('userdata')) {
    const token = JSON.parse(localStorage.getItem('userdata')).token;
    req.headers.authorization = `Bearer ${token}`;
  }

  return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const signup = (formData) => API.post('/auth/register', formData);

export const getALlClass = () => API.get('/classroom/getAll');
export const createClass = (data) => API.post('/classroom/create', data);
export const joinClass = (classId) => API.put(`/classroom/join?id=${classId}`);

export const getClassData = (classId) =>
  API.get(`/classroom/get?id=${classId}`);

export const getLeaderboard = (classId) =>
  API.get(`/classroom/getLeaderboard?id=${classId}`);
