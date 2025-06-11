import { BaseService } from "@/services";

export const GetuserApi = async () => {
    const res = await new BaseService().getJSON('/users')
    return res;
}

export const DeleteuserApi = async (id: number) => {
    const res = await new BaseService().deleteJSON(`/users/${id}`,{});
    return res;
}

export const Updateuserapi = async (id: number,payload:object) => {
    const res = await new BaseService().putJSON(`/users/${id}`,payload);
    return res;
}

export const Adduserapi = async (payload:object) => {
    const res = await new BaseService().postJSON('/users',payload);
    return res;
}