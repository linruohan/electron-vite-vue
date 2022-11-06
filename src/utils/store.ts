import { reactive } from "vue";
import type { Data, Children, ChinaTotal, ChinaAdd, StatisGradeCityDetail } from '@/request/module/yiqing/type'
import storage from "./storage";

const store = reactive({
  user: {
    isLogin: false,
    mid: 0,
    csrf: "",
    userInfo: <any>storage.get(storage.USER_INFO)
			? JSON.parse(storage.get(storage.USER_INFO))
			: null,
		token: <string | null>storage.get(storage.USER_TOKEN)
  },
  system: {
    isFullScreen: false,
  },
  clearUserInfo: () => {
    store.user.isLogin = false;
    store.user.mid = 0;
  },
  yiqing:{
    counter: <number>0,
		list: <Data>{},
		item: <Children[]>[],
		chinaAdd: <ChinaAdd>{},
		chinaTotal: <ChinaTotal>{},
		cityDetail: <StatisGradeCityDetail[]>[]
  },
});
export default store;
