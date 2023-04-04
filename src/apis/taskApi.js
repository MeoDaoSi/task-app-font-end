import axiosClient from './axiosClient'

const taskApi = {
    create: ( params) => axiosClient.post('/tasks', params),
    updatePriority: (params) => axiosClient.patch(
        '/tasks',
        params
    ),
    delete: (boardId, taskId) => axiosClient.delete(`boards/${boardId}/tasks/${taskId}`),
    update: (boardId, taskId, params) => axiosClient.put(
        `boards/${boardId}/tasks/${taskId}`,
        params
    )
}

export default taskApi