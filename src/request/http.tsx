import axios from 'axios'
import config from '../config'
const { requestConfig } = config
const baseURL = requestConfig.apiBase;
axios.defaults.timeout = requestConfig.timeout;//设置请求超时时间
axios.interceptors.request.use((config) => {
    config.headers["token"] = localStorage.getItem("token");
    return config
},
    (error) => {
        return Promise.reject(error)
    }
);
axios.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        const { response } = error;
        if (response) {
            return Promise.reject(response.data)
        } else {
            switch (true) {
                case error.message.includes('timeout'):
                    return Promise.reject({ message: requestConfig.errorMsg.timeout });
                case error.message.includes("Network"):
                    return Promise.reject({ message: requestConfig.errorMsg.network })
                default:
                    return Promise.reject(error)
            }
        }
    }
)
const post = (url: string, params: object, body?: Boolean) => {
    return new Promise((resolve, reject) => {
        let d = function () {
            if (body) {
                return { data: params };
            }
            return { params: params }
        };
        axios({
            baseURL: baseURL,
            url: url,
            method: 'post',
            ...d(),
        }).then((res) => {
            resolve(res.data)
        }).catch((error) => {
            reject(error)
        })
    })
}

const get = (url: string, params: object) => {
    return new Promise((resolve, reject) => {
        axios({
            baseURL,
            url,
            method: 'get',
            params: params
        }).then(res => {
            resolve(res.data)
        }).catch(error => {
            reject(error)
        })
    })
}
export { post, get }