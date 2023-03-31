import axiosClient from './axiosClient'

const boardApi = {
    create: () => axiosClient.post('/boards'),
    getAll: () => axiosClient.get('/boards'),
    updatePosition: (params) => axiosClient.patch('/boards', params),
    getOne: (id) => axiosClient.get(`/boards/${id}`),
    delete: (id) => axiosClient.delete(`/boards/${id}`),
    update: (id, params) => axiosClient.patch(`boards/${id}`, params),
    getFavorites: () => axiosClient.get('/favorite/boards'),
    updateFavoritePosition: (params) => axiosClient.patch('/favorite/boards', params),
}

export default boardApi