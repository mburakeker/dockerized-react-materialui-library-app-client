import axios from 'axios';

const apiUrl =  "https://localhost:5000/api/";
const headersPreset = {'Accept':'application/json'};
export const instance = axios.create({baseURL: apiUrl, headers: headersPreset});

const CancelToken = axios.CancelToken;
let cancel;

instance.interceptors.request.use(
    config => {
        if (cancel) {
            cancel(); // cancel request
        }
        config.cancelToken =  new CancelToken(function executor(c)
        {
            cancel = c;
        })
        return config
    },
    error => {
        console.log(JSON.stringify(error));
        Promise.reject(error);
    });
instance.interceptors.response.use((response) => {
    console.log(JSON.stringify(response));
    return response;
    }, function (error) {
        return Promise.reject(error);
    });