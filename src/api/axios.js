import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'; 

export default axios.create({
    baseURL: apiUrl,
});

export const axiosPrivate = axios.create({
    baseURL: apiUrl,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
