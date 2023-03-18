import axiosClient from './axiosClient'

const taskApi = {
    create: () => axiosClient.post('/tasks'),
    getAll: () => axiosClient.get('/tasks'),
}