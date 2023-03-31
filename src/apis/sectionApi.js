import axiosClient from './axiosClient'

const sectionApi = {
    create: () => axiosClient.post(`tasks/`)
}

export default sectionApi