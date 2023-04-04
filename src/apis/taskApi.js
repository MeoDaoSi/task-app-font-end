import axiosClient from './axiosClient'

const taskApi = {
    create: ( params) => axiosClient.post('/tasks', params),
    updatePriority: (params) => axiosClient.patch(
        '/tasks',
        params
    ),
    delete: (taskId) => axiosClient.delete(`/tasks/${taskId}`),
    update: (boardId, taskId, params) => axiosClient.put(
        `boards/${boardId}/tasks/${taskId}`,
        params
    )
}

export default taskApi