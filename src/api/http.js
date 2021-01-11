import axios from "axios";
import store from "../store";
import router from "../router";

axios.defaults.timeout = 600000;

axios.defaults.headers.post["Content-Type"] = "application/json; charset=UTF-8";
// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
        let httpUrl = config.url;
        if (config.method === "post") {
            var index = httpUrl.lastIndexOf("\/");
            httpUrl = httpUrl.substring(index + 1, httpUrl.length);
            if ('login' === httpUrl || 'logout' === httpUrl || 'addErrorInfo' === httpUrl || 'insertDataInfo' === httpUrl) {
                axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
            } else {
                config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }
        let token = sessionStorage.getItem('token')
        if (token) {
            config.headers.token = token
        }
        return config
    },
    error => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    response => {
        let res = response.data;
        if (res.code == 999999) {
            sessionStorage.removeItem('token');
            router.replace({
                path: '/login'
            })
            return false;
        }
        return response;
    },
    error => {
        let res = error.response.data;
        if (error.response.status == 500) {
            if (res.message == "Token失效，请重新登录") {
                sessionStorage.removeItem('token');
                router.currentRoute.name !== 'login' &&
                router.replace({
                    name: 'login'
                })
            }
        }
        return Promise.reject(error.response.data)
    }
);
export default {
    post(url, data, callback) {
        return axios
            .post(url, data, callback)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                callback(error);
            });
    },

    get(url, data, callback) {
        return axios
            .get(url, data, callback)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                callback(error);
            });
    },

    put(url, params, callback) {
        return axios
            .put(url, params, callback)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                callback(error);
            });
    },

    delete(url, params, callback) {
        return axios
            .delete(url, params, callback)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                callback(error);
            });
    },

    patch(url, params, callback) {
        return axios
            .patch(url, params, callback)
            .then(response => {
                callback(response.data);
            })
            .catch(error => {
                callback(error);
            });
    }
};
