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

export default {
    set,
    get,
    USER_TOKEN,
    USER_INFO,
};
