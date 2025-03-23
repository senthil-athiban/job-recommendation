import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { LoginFormInput, RegisterFormInput } from "@/types/auth";
import { domains } from "./config";
import { getSession, removeSession } from "./utils";
import { JobRecommendationResponse, JobsResponse, LoginResponse, Resume, UserProfileResponse } from "@/types/api";

const API_BASE = `${domains.BACKEND}/api/v1`;

const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized access, logging out...");
      removeSession();
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);

const apiRequest = <TData, TResponse>(
    method: 'get' | 'post' | 'put' | 'delete',
    endpoint: string,
    data?: TData,
    requiresAuth: boolean = true,
    config: AxiosRequestConfig = {}
  ) => {
    
    const requestConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config.headers,
        ...(requiresAuth && { Authorization: `Bearer ${getSession()}` })
      }
    };
  
    
    const url = `${API_BASE}${endpoint}`;
  
    switch (method) {
      case 'get':
        return axiosInstance.get<TResponse>(url, requestConfig);
      case 'post':
        return axiosInstance.post<TResponse>(url, data, requestConfig);
      case 'put':
        return axiosInstance.put<TResponse>(url, data, requestConfig);
      case 'delete':
        return axiosInstance.delete<TResponse>(url, requestConfig);
    }
  };

export const authApi = {
  login: (payload: LoginFormInput) => apiRequest<LoginFormInput, LoginResponse>('post', '/auth/login', payload),
    
  register: (payload: RegisterFormInput) => apiRequest<RegisterFormInput, UserProfileResponse>('post', '/auth/register', payload)
};

export const jobApi = {
  getAllJobs: () => apiRequest<void, JobsResponse>('get', '/jobs/all'),
    
  getMatchedJobs: () => apiRequest<void, JobRecommendationResponse>('get', '/jobs/matched')
};

export const resumeApi = {
  getResumeById: (resumeId: string) => apiRequest('get', `/resume/${resumeId}`),
    
  getAllResumes: () => apiRequest<void, Array<Resume>>('get', '/resume/all'),
    
  upload: (payload: FormData) => apiRequest('post', '/resume/upload', payload, true, {
      headers: { "Content-Type": 'multipart/form-data' }
    })
};

export const userApi = {
    getProfile: () => apiRequest<void, UserProfileResponse>('get', '/user/me')
}