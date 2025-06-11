import { useNavigate } from "react-router";
import { useAuthStore } from "@/stores";

export const useAuth = () => {
    const navigate = useNavigate();
    const {token, login:storeLogin, logout:storeLogout} = useAuthStore();
    const login = (token: string) => {
        storeLogin(token);
        navigate('/users');
    }
    const logout = () => {
        storeLogout();
        sessionStorage.clear();
    }
    return {
        token,
        login,
        logout
    }
}