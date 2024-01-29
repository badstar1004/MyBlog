// Axios 인스턴스 및 인터셉터 설정
// axiosInstance.js
import axios from 'axios';
import {
    requestInterceptor,
    responseInterceptor,
    responseErrorInterceptor
} from './axiosInterceptors';
import { API_BASE_URL } from './endpoints';


const axiosInstance = axios.create({
    // 기본 설정
    baseURL: API_BASE_URL
});

// 요청 인터셉터 적용
axiosInstance.interceptors.request.use(requestInterceptor);

// 응답 인터셉터 적용
axiosInstance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default axiosInstance;
