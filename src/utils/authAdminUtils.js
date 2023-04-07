import authAdminApi from "../apis/authAdminApi";

const authAdminUtils = {
    isAuthenticated: async () => {
        const token = localStorage.getItem('tokenAdmin');
        if (!token) {
            return false;
        }
        try {
            const res = await authAdminApi.verifyToken();
            return res.data
        } catch {
            return false;
        }
    }
}
export default authAdminUtils;