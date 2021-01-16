import axios from 'axios';

const apiUrl =  "https://localhost:5000/api/";
const headersPreset = {'Accept':'application/json'};
export const instance = axios.create({baseURL: apiUrl, headers: headersPreset});