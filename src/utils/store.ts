import { reactive } from "vue";
import storage from "./storage";
import type { FLocation } from '@/request/module/weather/weather';


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
  themeValue: 'lightTheme',
  showFestivals: false,
  showWeather: false,
  location: {
    longitude: 114.52,
    latitude: 38.02,
  } as FLocation,
  focusTime: 40,
  system: {
    isFullScreen: false,
  },
  clearUserInfo: () => {
    store.user.isLogin = false;
    store.user.mid = 0;
  },
  changeThemeValue: (themeValue: string) => {
    store.themeValue = themeValue;
  },
  changeShowFestivals: () => {
    store.showFestivals = !store.showFestivals;
  },
  changeShowWeather: () => {
    store.showWeather = !store.showWeather;
  },
  changeLocation: (location: FLocation) => {
    store.location = {
      longitude: location.longitude,
      latitude: location.latitude,
    } as FLocation;
  },
  changeFocusTime(focusTime: number) {
    store.focusTime = focusTime;
  },
});
export default store;
