import axiosClient from './axiosClient'

const boardApi = {
    create: () => axiosClient.post('/boards', { title: 'board1'}),
    getAll: () => axiosClient.get('/boards'),
}

export default boardApi