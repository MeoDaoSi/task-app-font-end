import axiosClient from './axiosClient'

const taskApi = {
    create: () => axiosClient.post('/tasks', { title: 'test'}),
    getAll: () => axiosClient.get('/tasks'),
}

export default taskApi