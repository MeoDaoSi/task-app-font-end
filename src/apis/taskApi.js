import axiosClient from './axiosClient'

const taskApi = {
    create: ( params) => axiosClient.post('/tasks', params),
    updatePriority: (params) => axiosClient.patch(
        '/tasks',
        params
    ),
    delete: (taskId) => axiosClient.delete(`/tasks/${taskId}`),
    update: (taskId, params) => axiosClient.patch(
        `/tasks/${taskId}`,
        params
    ),
    getAll: () => axiosClient.get('/tasks')
}

export default taskApi