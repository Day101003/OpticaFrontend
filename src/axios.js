// src/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5282/api',
    timeout: 10000, 
});

export default instance;
