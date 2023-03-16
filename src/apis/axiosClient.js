import axios from 'axios';
import queryString from 'query-string';

const baseURL = 'http:/127.0.0.1:5000/api/v1'
const getToken = () => localStorage.getItem('token');     

const axiosClient = axios.create({
    baseURL,
    paramsSerializer: params => queryString({params})
})

axiosClient.interceptors.request.use( async config => {
    return {
        ...config,
        headers:{
            'Content-Type': 'application/json',
            'authorization': `Bearer ${getToken()}`
        }
    }
})

axiosClient.interceptors.request.use( response => {
    if ( response && response.data ){
        return response.data;
    }
    return response;
}, error => {
    if (error.response.status === 401) {
        alert('Bạn không có quyền truy cập!');
    }
    return Promise.reject(error);
})

export default axiosClient;