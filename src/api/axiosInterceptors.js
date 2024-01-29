// axiosInterceptors.js

// 요청을 보내기 전에 실행할 인터셉터
export const requestInterceptor = config => {
    // 여기에 요청을 보내기 전에 필요한 로직을 작성
    // 예: 토큰을 헤더에 추가
    const token = localStorage.getItem('token');
    if(token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
};


// 응답을 받은 후에 실행할 인터셉터
export const responseInterceptor = response => {
    // 여기에 응답을 받고나서 필요한 로직을 작성
    // 예: 응답 데이터를 가공
    return response;
};


// 응답 에러를 처리할 인터셉터
export const responseErrorInterceptor = error => {
    // 여기에 에러를 처리하는 로직을 작성
    // 예: 특정 에러 코드에 대한 핸들링
    if(error.response && error.response.status === 401) {
        // 인증 에러 처리
    }

    return Promise.reject(error);
};