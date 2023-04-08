import axiosClient from "./axiosClient";

const authAdminApi = {
    login: params => axiosClient.post('/admin/login', params),
    logout: () => axiosClient.post('/admin/logout'),
    verifyToken: () => axiosClient.get('/admin/me'),
    getAllUsers: () => axiosClient.get('/users'),
}

export default authAdminApi;