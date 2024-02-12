/** @format */

import type { Method, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import axios from "axios";
import qs from "qs";
import store from "./store";

// const HttpsProxyAgent = require('https-proxy-agent');
import { handleResponseErrors } from "./tools";
// import router from "../router";
// axios.defaults.adapter = require('axios/lib/adapters/http');
axios.defaults.withCredentials = true;

const base_url = process.env.VITE_DEV_SERVER_URL ? process.env.VITE_DEV_SERVER_URL : "http://127.0.0.1:3344"

const service = axios.create({
  timeout: 3000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  // 请求成功
  (res) => {
    if (res.status === 200) {
      if (res.data.code === 403) {
        // router.push({ path: "/login" });
      }
      if (
        res.data.code != undefined &&
        res.data.code !== 0 &&
        res.data.code !== -101
      ) {
        handleResponseErrors(res.status, res.data.message);
        return Promise.reject(res.data);
      }
      return Promise.resolve(res.data);
    } else {
      return Promise.reject(res);
    }
  },
  // 请求失败
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在200的范围
      handleResponseErrors(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      // store.commit('changeNetwork', false);
      return { data: { code: 500 } };
    }
  }
);

export interface BaseData<T = any> {
  code: number;
  message: string;
  data: T;
  result: T;
}

const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<BaseData<T>> => {
  if (config.method?.toUpperCase() === "POST") {
    store.user.csrf &&
      (config.params = { ...config.params, csrf: store.user.csrf });
    config.data = qs.stringify(config.data);
  }
  const data: BaseData<T> = await service.request(config);
  return data;
};

export { request, base_url };
