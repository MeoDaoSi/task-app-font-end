import axiosClient from './axiosClient'

const notificationApi = {
    create: (params) => axiosClient.post('/notifications',params),
    getAll: () => axiosClient.get('/notifications')
}

export default notificationApi