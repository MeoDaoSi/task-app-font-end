import authApi from "../apis/authApi";

const authUtils = {
    isAuthenticated: async () => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (!token) {
            return false;
        }
        try {
            const res = await authApi.verifyToken();
            return res.data
        } catch {
            return false;
        }
    }
}
export default authUtils;