/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { useAuthStore } from '@/stores';
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const EXTERNAL_API_URL = import.meta.env.VITE_APP_EXTERNAL_API;

class BaseService {
  private url: string;
  private api: any;

  constructor(baseurl?: string) {
    this.url = baseurl ?? BASE_URL;
    this.api = axios.create({
      baseURL: this.url,
      timeout: 60 * 5 * 1000 /** 5 Mins */,
      validateStatus: (status: number) => {
        return status >= 200 && status <= 600;
      },
      headers: {
        'Cache-Control': 'no-cache, no-store',
        Expires: '0',
        Pragma: 'no-cache',
      },
    });
    this.api.interceptors.request.use((config: any) => {
      const {token} = useAuthStore.getState();
      const configuration = {
        ...config,
        headers: {
          Authorization: `Bearer ${token}`,
          ...config.headers,
        },
      };
      return Promise.resolve(configuration);
    });
    this.api.interceptors.response.use(
      (response: any) => {
        const data = response.data;
        if (data.status === 'fail') {
          console.error('error');
          // }
        } else if (response.status === 401) {
          sessionStorage.clear();
          window.location.href = '/login';
        }
        return Promise.resolve(response);
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );
  }

  getJSON(endPoint: string, configs = {}): Promise<any> {
    return this.api.get(endPoint, configs);
  }

  postJSON(endPoint: string, params: object, configs = {}, isFormData = false): Promise<any> {
    configs = {
      ...configs,
      Headers: {
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      },
    };
    const requestData = isFormData ? this.convertJsonToFormData(params) : params;

    return this.api.post(endPoint, requestData, configs);
  }
  putJSON(endPoint: string, params: object, configs = {}): Promise<any> {
    return this.api.put(endPoint, params, configs);
  }
  deleteJSON(endPoint: string, params: object, configs = {}): Promise<any> {
    return this.api.delete(endPoint, params, configs);
  }
  private convertJsonToFormData(jsonData: any): FormData {
    const formData = new FormData();
    for (const key in jsonData) {
      if (Object.prototype.hasOwnProperty.call(jsonData, key)) {
        formData.append(key, jsonData[key]);
      }
    }
    return formData;
  }
}
const externalService = new BaseService(EXTERNAL_API_URL);
const baseService = new BaseService();
export { BaseService, baseService, externalService };