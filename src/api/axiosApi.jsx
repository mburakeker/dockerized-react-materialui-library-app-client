import axios from 'axios';

const apiUrl =  "https://localhost:5000/api/";
const headersPreset = {'Accept':'application/json'};
export const instance = axios.create({baseURL: apiUrl, headers: headersPreset});

instance.interceptors.request.use(
    config => {
        return config
    },
    error => {
        Promise.reject(error);
    });
instance.interceptors.response.use((response) => {
    return response;
    }, function (error) {
        return Promise.reject(error);
    });