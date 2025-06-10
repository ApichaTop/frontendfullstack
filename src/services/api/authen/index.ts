import { BaseService } from "@/services";

export const LoginApi = async (payload:object) => {
    const res = await new BaseService().postJSON('/authen/login', payload)
    return res;
}