import axiosClient from './axiosClient'

const notificationApi = {
    create: (params) => axiosClient.post('/notification',params),
    getAll: () => axiosClient.get('/notification')
}

export default notificationApi