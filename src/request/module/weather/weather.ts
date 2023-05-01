// 西安莲湖
// https://open.coding01.cn/weatherdata?&location=108.933197,34.265598

export type FLocation = {
    longitude: number, // 经度
    latitude: number,  // 纬度
}
export interface WeatherResult {
    locations: Location[];
    updateTime: string;
    weatherDailies: WeatherDaily[];
    weatherNow: WeatherNow;
}

export interface Location {
    name: string;
    id: string;
    lat: string;
    lon: string;
    adm2: string;
    adm1: string;
    country: string;
    tz: string;
    utcOffset: string;
    isDst: string;
    type: string;
    rank: string;
    fxLink: string;
}

export interface WeatherDaily {
    fxDate: string;
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moonPhase: string;
    moonPhaseIcon: string;
    tempMax: string;
    tempMin: string;
    iconDay: string;
    textDay: string;
    iconNight: string;
    textNight: string;
    wind360Day: string;
    windDirDay: string;
    windScaleDay: string;
    windSpeedDay: string;
    wind360Night: string;
    windDirNight: string;
    windScaleNight: string;
    windSpeedNight: string;
    humidity: string;
    precip: string;
    pressure: string;
    vis: string;
    cloud: string;
    uvIndex: string;
}

export interface WeatherNow {
    obsTime: string;
    temp: string;
    feelsLike: string;
    icon: string;
    text: string;
    wind360: string;
    windDir: string;
    windScale: string;
    windSpeed: string;
    humidity: string;
    precip: string;
    pressure: string;
    vis: string;
    cloud: string;
    dew: string;
    pubTime: string;
    aqi: string;
    level: string;
    category: string;
    primary: string;
    pm10: string;
    pm2p5: string;
    no2: string;
    so2: string;
    co: string;
    o3: string;
}