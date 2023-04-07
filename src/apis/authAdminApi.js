import axiosClient from "./axiosClient";

const authAdminApi = {
    login: params => axiosClient.post('/admin/login', params),
    verifyToken: () => axiosClient.get('/admin/me'),
    getAllUsers: () => axiosClient.get('/users'),
}

export default authAdminApi;