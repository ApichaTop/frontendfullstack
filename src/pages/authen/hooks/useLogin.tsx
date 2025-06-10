import { useState } from "react";
import { LoginApi } from "@/services/api/authen";
import { useAuth } from "@/utils/authen/auth";
export const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useAuth();
    const handleLogin = async () => {
        const payload = {
            email: encodeURI(email),
            password
        }
        LoginApi(payload)
            .then((res) => {
                console.log('Login successful:', res);
                if (res.status === 200){
                    login(res.data.token);
                }
            })
            .catch((error) => {
                console.error('Login failed:', error);
            })
            .finally(() => {
                console.log('Login attempt completed');
            }
        );
    }
    const handleChange = (field: string, value: string) => {
        if (field === 'email') {
            setEmail(value);
        } else if (field === 'password') {
            setPassword(value);
        }
    }
    return {handleChange, email, password,handleLogin};
}
