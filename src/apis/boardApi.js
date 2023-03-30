import axiosClient from './axiosClient'

const boardApi = {
    create: () => axiosClient.post('/boards'),
    getAll: () => axiosClient.get('/boards'),
    updatePosition: (params) => axiosClient.patch('/boards', params),
    getOne: (id) => axiosClient.get(`/boards/${id}`),
    update: (id, params) => axiosClient.patch(`boards/${id}`, params),
}

export default boardApi