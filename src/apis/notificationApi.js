import axiosClient from './axiosClient'

const notificationApi = {
    create: (taskId) => axiosClient.post('/notification'),
    getAll: () => axiosClient.get('/notification')
}

export default notificationApi