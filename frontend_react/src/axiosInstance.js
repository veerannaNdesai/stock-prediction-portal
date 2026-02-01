import axios from "axios";

const BaseURL = import.meta.env.VITE_BACKEND_BASE_URL
const accessToken = localStorage.getItem('accessToken')
const axiosInstance = axios.create({
    baseURL : BaseURL,
    headers : {
        "Content-Type" : 'application/json',
    }
})

// Request Interceptor
 axiosInstance.interceptors.request.use(
    function(config){
        if (accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`
        }
        
        return config
    },
    function(error){
        return Promise.reject(error)
    }
    )

// Response Interceptors
axiosInstance.interceptors.response.use(
    function(response){
        return response
    },
    // Handle failed responses
    async function(error){
        const originalRequest = error.config;
        if(error.response.status === 401 && !originalRequest.retry){
            originalRequest.retry = true;
            const refreshToken = localStorage.getItem('refreshToken')
            try{
                const response = await axiosInstance.post('/token/refresh/', {refresh: refreshToken})
                localStorage.setItem('accessToken', response.data.access)
                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
                return axiosInstance(originalRequest)
            }catch(error){
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
            }
        }
        return Promise.reject(error);
    }

)

 


export default  axiosInstance;