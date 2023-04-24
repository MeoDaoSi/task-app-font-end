import axiosClient from "./axiosClient";

const authApi = {
    signup: params => axiosClient.post('/users', params),
    login: params => axiosClient.post('/users/login', params),
    logout: () => axiosClient.post('/users/logout'),
    verifyToken: () => axiosClient.get('/users/me')
}

export default authApi;