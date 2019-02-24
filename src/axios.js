import axios from 'axios'
import router from './router';


axios.defaults.baseURL = "http://localhost:8080/api"


axios.interceptors.request.use(config => {
    // 向 config 中的 headers 中加入我们的 token
    // console.log(config)
    const token = localStorage.getItem('token');
    token ? config.headers.Authorization = token : null;
    return config;
})

// 添加响应拦截器，判断响应中的 res_code 是否为401， 如果是则跳转到登录页
axios.interceptors.response.use(res => {
    // console.log(res.data)
    if(res.data.res_code === 401){
        router.push('/login');
    }
    // console.log(res)
    return res;
})

export default axios