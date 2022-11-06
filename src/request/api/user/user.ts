import storage from '@/utils/storage'
import store from '@/utils/store'
import { request, base_url } from '@/utils/axios'
import { join } from 'path'

export const setToken = (token: string) => {
	// 更新本地缓存
	storage.set(storage.USER_TOKEN, token)
	// 更新state
	store.user.token = token
}
export const setUserInfo = (userInfo: string) => {
	// 更新本地缓存
	storage.set(storage.USER_INFO, JSON.stringify(userInfo))
	// 更新state
	store.user.userInfo = userInfo
}
interface RegisterParams {
	telephone: string;
	password: string;
	name: string;
}

export const register = (data: RegisterParams) => {
	return request({
		url: join(base_url, "auth/register"),
		method: "post",
		data,
	});
}



interface LoginParams {
	telephone: string;
	password: string;
	name?: string;
}
export const login = (data: LoginParams) => {
	return request({
		url: join(base_url, "auth/login"),
		method: "post",
		data,
	});
}
export const getUserInfo = (data: LoginParams) => {
	return request({
		url: join(base_url, "auth/info"),
		method: "get",
		data,
	});
}



export const logout = () => {
	// 清除token
	store.user.token = ''
	storage.set(storage.USER_TOKEN, '')
	// 清除用户信息
	store.user.userInfo = ''
	storage.set(storage.USER_INFO, '')
	window.location.reload()
}
