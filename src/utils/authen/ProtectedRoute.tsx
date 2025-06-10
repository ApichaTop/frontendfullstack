import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/utils/authen/auth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const { token } = useAuth();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    return token ? children : null;
};

export default ProtectedRoute;