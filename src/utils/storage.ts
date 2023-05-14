// 本地缓存服务

const PREFIX = 'jkdev_';

// user
const USER_PRIFIX = `${PREFIX}user_`;
const USER_TOKEN = `${USER_PRIFIX}token`;
const USER_INFO = `${USER_PRIFIX}info`;

// 储存
const set = (key: string, data: string) => {
    localStorage.setItem(key, data);
};

// 读取
const get = (key: string): any => {
    return localStorage.getItem(key)
};

const TokenKey = 'token'

export function getToken() {
    return localStorage.getItem(TokenKey)
}

export function setToken(token: string) {
    return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
    return localStorage.setItem(TokenKey, '')
}

export default {
    set,
    get,
    USER_TOKEN,
    USER_INFO,
};
