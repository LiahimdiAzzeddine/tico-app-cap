import axios from 'axios';

const apiUrl = "http://192.168.11.118:8000";
export default axios.create({
    baseURL: apiUrl,
});

export const axiosPrivate = axios.create({
    baseURL: apiUrl,
    headers: {'Content-Type': 'application/json'},
    withCredentials:true
});
