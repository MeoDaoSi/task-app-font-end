import axiosClient from "./axiosClient";

const authApi = {
    signup: params => axiosClient.post('/users', params),
    login: params => axiosClient.post('/users/login', params),
    verifyToken: () => axiosClient.get('/users/me')
}

export default authApi;