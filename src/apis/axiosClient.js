import axios from 'axios';
import queryString from 'query-string';

// const baseURL = 'http:/127.0.0.1:5000/api/v1'
// const getToken = () => localStorage.getItem('token');     

const axiosClient = axios.create({
    baseURL: 'http://localhost:80',
    // paramsSerializer: params => queryString({params})
})

axiosClient.interceptors.request.use( async config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // return {
    //     ...config,
    //     headers:{
    //         'Content-Type': 'application/json',
    //         'authorization': `Bearer ${getToken()}`
    //     }
    // }
    return config
})

// axiosClient.interceptors.response.use( response => {
//     // if ( response ){
//     //     return response;
//     // }
//     // return response;
//     throw new Error(`Server Error - ${response.status}`);
// }, error => {
//     if (error.response && error.response.status === 400) {
//         console.log('Bad Request Error');
//     }
//     throw error;
// })

export default axiosClient;