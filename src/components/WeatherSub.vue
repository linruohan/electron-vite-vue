<template>
    <div class="weather" v-if="weather">
        <div class="weather-current">
            <el-row v-if="weather.locations" class="location">
                <h1>{{ weather.locations[0].name }}-{{ weather.locations[0].adm2 }}</h1>
                <span>{{ weather.locations[0].adm1 }}/{{ weather.locations[0].country }}</span>
                <p class="update-time">{{ weather.updateTime }}</p>
            </el-row>
            <el-row v-if="weather.weatherNow">
                <div class="current-live__item">
                    <el-badge @click="getWeathers" :value="temp" type="primary" class="item weatherTemp">
                        <img style="width:80px;height:80px" :src="weatherIcon" />
                    </el-badge>
                    <p>{{ weather.weatherNow.text }}</p>
                    <el-tag type="success"> AQI {{ weather.weatherNow.aqi }} {{ weather.weatherNow.category }} </el-tag>
                </div>
                <div class="wind">
                    <el-tag> {{ weather.weatherNow.windScale }}级 {{ weather.weatherNow.windDir }}</el-tag>
                    <el-tag>{{ weather.weatherNow.humidity }}% 相对湿度</el-tag>
                    <el-tag>强 紫外线</el-tag>
                </div>
            </el-row>
        </div>
        <el-row v-if="weather.weatherDailies">
            <div class="c-city-weather-forecast index">
                <h3 class="qweather-title">未来三天预报</h3>
                <div v-for="item in weather.weatherDailies" class="city-forecast-tabs__row">
                    <div class="date-bg">
                        <p style="color:rgb(179 179 243);font-weight:bold;">{{ getWeek(item.fxDate) }}</p>
                        <p style="margin-left:20px"> {{ item.fxDate }}</p>
                    </div>
                    <img style="width:30px;height:30px" :src="getIcon(item.iconDay)" />

                    <div class="tmp-cont d-flex align-items-center">
                        <span class="temp last">{{ item.tempMin }}°</span>
                        <div class="tmp-line"></div>
                        <span class="temp">{{ item.tempMax }}°</span>

                    </div>
                </div>
            </div>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, computed, onBeforeUpdate, onBeforeMount, onUpdated } from "vue";
import axios from 'axios';
// import wrapper from 'axios-cache-plugin';
import type { FLocation, WeatherResult } from '@/request/module/weather/weather';
import { useIntervalFn } from '@vueuse/core';
import type { UseIntervalFnOptions } from '@vueuse/core';

import weathericons100 from '@/assets/weathericons/100.png';
import weathericons101 from '@/assets/weathericons/101.png';
import weathericons102 from '@/assets/weathericons/102.png';
import weathericons103 from '@/assets/weathericons/103.png';
import weathericons104 from '@/assets/weathericons/104.png';
import weathericons150 from '@/assets/weathericons/150.png';
import weathericons153 from '@/assets/weathericons/153.png';
import weathericons154 from '@/assets/weathericons/154.png';
import weathericons300 from '@/assets/weathericons/300.png';
import weathericons301 from '@/assets/weathericons/301.png';
import weathericons302 from '@/assets/weathericons/302.png';
import weathericons303 from '@/assets/weathericons/303.png';
import weathericons304 from '@/assets/weathericons/304.png';
import weathericons305 from '@/assets/weathericons/305.png';
import weathericons306 from '@/assets/weathericons/306.png';
import weathericons307 from '@/assets/weathericons/307.png';
import weathericons308 from '@/assets/weathericons/308.png';
import weathericons309 from '@/assets/weathericons/309.png';
import weathericons310 from '@/assets/weathericons/310.png';
import weathericons311 from '@/assets/weathericons/311.png';
import weathericons312 from '@/assets/weathericons/312.png';
import weathericons313 from '@/assets/weathericons/313.png';
import weathericons314 from '@/assets/weathericons/314.png';
import weathericons315 from '@/assets/weathericons/315.png';
import weathericons316 from '@/assets/weathericons/316.png';
import weathericons317 from '@/assets/weathericons/317.png';
import weathericons318 from '@/assets/weathericons/318.png';
import weathericons350 from '@/assets/weathericons/350.png';
import weathericons351 from '@/assets/weathericons/351.png';
import weathericons399 from '@/assets/weathericons/399.png';
import weathericons400 from '@/assets/weathericons/400.png';
import weathericons401 from '@/assets/weathericons/401.png';
import weathericons402 from '@/assets/weathericons/402.png';
import weathericons403 from '@/assets/weathericons/403.png';
import weathericons404 from '@/assets/weathericons/404.png';
import weathericons405 from '@/assets/weathericons/405.png';
import weathericons406 from '@/assets/weathericons/406.png';
import weathericons407 from '@/assets/weathericons/407.png';
import weathericons408 from '@/assets/weathericons/408.png';
import weathericons409 from '@/assets/weathericons/409.png';
import weathericons410 from '@/assets/weathericons/410.png';
import weathericons456 from '@/assets/weathericons/456.png';
import weathericons457 from '@/assets/weathericons/457.png';
import weathericons499 from '@/assets/weathericons/499.png';
import weathericons500 from '@/assets/weathericons/500.png';
import weathericons501 from '@/assets/weathericons/501.png';
import weathericons502 from '@/assets/weathericons/502.png';
import weathericons503 from '@/assets/weathericons/503.png';
import weathericons504 from '@/assets/weathericons/504.png';
import weathericons507 from '@/assets/weathericons/507.png';
import weathericons508 from '@/assets/weathericons/508.png';
import weathericons509 from '@/assets/weathericons/509.png';
import weathericons510 from '@/assets/weathericons/510.png';
import weathericons511 from '@/assets/weathericons/511.png';
import weathericons512 from '@/assets/weathericons/512.png';
import weathericons513 from '@/assets/weathericons/513.png';
import weathericons514 from '@/assets/weathericons/514.png';
import weathericons515 from '@/assets/weathericons/515.png';
import weathericons900 from '@/assets/weathericons/900.png';
import weathericons901 from '@/assets/weathericons/901.png';
import weathericons999 from '@/assets/weathericons/999.png';
const location = ref<FLocation>({
    longitude: 108.933197,
    latitude: 34.265598,
})
const weather = ref(<WeatherResult>{})

const weatherIcon = ref("")
const temp = ref("")

const getWeathers = async (): Promise<WeatherResult> => {
    console.log("getWeather update !")
    const locationStr = location.value.longitude + ',' + location.value.latitude;
    // const http = wrapper(axios, {
    //     maxCacheSize: 15,
    // });
    // axios.__addFilter(/weatherdata/);

    const res = await axios({
        url: import.meta.env.VITE_WEATHER_API,
        method: 'get',
        params: {
            location: locationStr,
        },
    });
    weatherIcon.value = getIcon(res.data.weatherNow.icon)
    temp.value = res.data.weatherNow.temp + '°C'
    weather.value = res.data
    console.log("weather:", weather.value)
    console.log("temp:", temp.value)
    console.log("weatherIcon:", weatherIcon.value)
    return res.data

}
// const intervalFnOptions = reactive({
//     immediate: true,
// } as IntervalFnOptions);

// const { pause, resume, isActive } = useIntervalFn(() => {
//     getWeather();
// }, 7200000, intervalFnOptions);
const getIcon = (iconDay: string): string => {
    const weatherIcons = [
        { iconday: '100', icon: weathericons100 },
        { iconday: '101', icon: weathericons101 },
        { iconday: '102', icon: weathericons102 },
        { iconday: '103', icon: weathericons103 },
        { iconday: '104', icon: weathericons104 },
        { iconday: '150', icon: weathericons150 },
        { iconday: '153', icon: weathericons153 },
        { iconday: '154', icon: weathericons154 },
        { iconday: '300', icon: weathericons300 },
        { iconday: '301', icon: weathericons301 },
        { iconday: '302', icon: weathericons302 },
        { iconday: '303', icon: weathericons303 },
        { iconday: '304', icon: weathericons304 },
        { iconday: '305', icon: weathericons305 },
        { iconday: '306', icon: weathericons306 },
        { iconday: '307', icon: weathericons307 },
        { iconday: '308', icon: weathericons308 },
        { iconday: '309', icon: weathericons309 },
        { iconday: '310', icon: weathericons310 },
        { iconday: '311', icon: weathericons311 },
        { iconday: '312', icon: weathericons312 },
        { iconday: '313', icon: weathericons313 },
        { iconday: '314', icon: weathericons314 },
        { iconday: '315', icon: weathericons315 },
        { iconday: '316', icon: weathericons316 },
        { iconday: '317', icon: weathericons317 },
        { iconday: '318', icon: weathericons318 },
        { iconday: '350', icon: weathericons350 },
        { iconday: '351', icon: weathericons351 },
        { iconday: '399', icon: weathericons399 },
        { iconday: '400', icon: weathericons400 },
        { iconday: '401', icon: weathericons401 },
        { iconday: '402', icon: weathericons402 },
        { iconday: '403', icon: weathericons403 },
        { iconday: '404', icon: weathericons404 },
        { iconday: '405', icon: weathericons405 },
        { iconday: '406', icon: weathericons406 },
        { iconday: '407', icon: weathericons407 },
        { iconday: '408', icon: weathericons408 },
        { iconday: '409', icon: weathericons409 },
        { iconday: '410', icon: weathericons410 },
        { iconday: '456', icon: weathericons456 },
        { iconday: '457', icon: weathericons457 },
        { iconday: '499', icon: weathericons499 },
        { iconday: '500', icon: weathericons500 },
        { iconday: '501', icon: weathericons501 },
        { iconday: '502', icon: weathericons502 },
        { iconday: '503', icon: weathericons503 },
        { iconday: '504', icon: weathericons504 },
        { iconday: '507', icon: weathericons507 },
        { iconday: '508', icon: weathericons508 },
        { iconday: '509', icon: weathericons509 },
        { iconday: '510', icon: weathericons510 },
        { iconday: '511', icon: weathericons511 },
        { iconday: '512', icon: weathericons512 },
        { iconday: '513', icon: weathericons513 },
        { iconday: '514', icon: weathericons514 },
        { iconday: '515', icon: weathericons515 },
        { iconday: '900', icon: weathericons900 },
        { iconday: '901', icon: weathericons901 },
        { iconday: '999', icon: weathericons999 },
    ];
    const imgSrc = weatherIcons.find((data: { iconday: string; }) => data.iconday == iconDay);
    return imgSrc?.icon || '';
}
const getWeek = (dateString: string) => {
    var dateArray = dateString.split("-");
    var new_date = new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2]));
    return "星期" + "天一二三四五六".charAt(new_date.getDay());
};
getWeathers()
</script>

<style lang="scss" scoped>
@import "@/assets/css/weather_mac.scss";

.weather-current {
    background-image: linear-gradient(225deg, rgb(75, 83, 106), rgb(53, 61, 82));
}

.el-tag {
    background-color: #272827;
    border-color: black;
}

.c-city-weather-forecast.index .city-weather-forecast__tabs .city-forecast-tabs__row {
    padding: 10px 0;
}

.tmp-line {
    background-image: linear-gradient(to right, rgb(142, 44, 13), rgb(0, 50, 164));
    flex: 1 0;
    height: 10px;
    border-radius: 10px;
    display: inline-block;
    vertical-align: middle;
    min-width: 160px;
}

.current-live__item {
    justify-content: center;
    align-items: center;
    margin-left: 100px;
}

.city-forecast-tabs__row {
    border-bottom: 1px solid #e8c3cb;
    width: 100%;
    border-radius: 2px !important;
}

.temp {
    // flex: 0 0 42px;
    padding-left: 4px;
    padding-right: 4px;
    text-align: right;
}

.date-bg {
    display: inline-flex;
    flex: 0 0 150px;
    margin-left: 10px;
    vertical-align: middle;
    white-space: nowrap;
    width: 30%;
    line-height: 1.2;

}

img {
    overflow-clip-margin: content-box;
    overflow: clip;
    width: 20%;
}

.tmp-cont {
    // flex: 1 0;
    // min-width: 100px;
    width: 50%;
}

.wind {
    margin-top: 20px;
    margin-left: 100px;
    display: grid;
    justify-content: center;
    align-items: center;
    width: 200px;
}

.tmp-cont,
.city-forecast-tabs__row,
.location {
    display: flex;
    justify-content: space-between;
    align-items: center;

}

.tmp-cont,
.location {
    margin-left: 50px;

}


.weather {
    // background: rgb(53, 54, 58);
    // color: rgba(232, 234, 237, 1);
    font-family: 'LXGW WenKai';
    border: 2px solid #f06485;
}

.weatherTemp {
    font-size: 0.8rem;
    top: 10px;
}
</style>