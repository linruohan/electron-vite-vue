

<template>
    <div class='demo-app'>
        <div class='demo-app-main'>
            <FullCalendar ref="fullcalendar" class='demo-app-calendar' :options='calendarOptions'
                :style="{ '--fc-today-bg-color': fc_today_bg_color }">
                <template v-slot:eventContent='arg'>
                    <b>{{ arg.timeText }}</b>
                    <i>{{ arg.event.title }}</i>
                </template>
            </FullCalendar>
        </div>
        <div class='demo-app-sidebar'>
            <WeatherSub v-if="changeShowWeather" v-model:changeShowWeather="changeShowWeather"
                v-model:location="location" />
            <n-drawer v-model:show="showDrawer" :width="settingDrawerWidth" placement="left">
                <DateViewSub v-if="visibleFullDateView" v-model:date="date" />
                <event-create-sub v-if="visibleECSub" v-model:event="event" @add-event-click="addEventClick" />
            </n-drawer>
            <div class='demo-app-sidebar-section'>
                <h2>Instructions</h2>
                <ul>
                    <li>Select dates and you will be prompted to create a new event</li>
                    <li>Drag, drop, and resize events</li>
                    <li>Click an event to delete it</li>
                </ul>
            </div>
            <div class='demo-app-sidebar-section'>
                <label>
                    <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle' />
                    toggle weekends
                </label>
            </div>
            <div class='demo-app-sidebar-section'>
                <h2>All Events ({{ currentEvents.length }})</h2>
                <ul>
                    <li v-for='event in currentEvents' :key='event.id'>
                        <b>{{ event.startStr }}</b>
                        <i>{{ event.title }}</i>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import { inject, reactive, ref } from 'vue'
import CalendarViewService from '@/request/api/weather/CalendarViewService'
import type { WeatherDaily, WeatherValueMap } from '@/request/module/weather/info';
import type { GlobalTheme } from 'naive-ui';
import { darkTheme, NCard, NElement as NEl, useThemeVars, NConfigProvider } from 'naive-ui';
import { NDrawer } from 'naive-ui';
import { CalendarOptions, EventApi, EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import type {
    CustomButtonInput,
    CalendarApi,
    EventSourceInput,
    DateRangeInput,
    DateInput,
    DayCellContentArg,
} from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import zhLocale from '@fullcalendar/core/locales/zh-cn';
import type { FLocation } from '@/request/module/weather/info';
import DateViewSub from '@/components/DateViewSub.vue';
import WeatherSub from '@/components/WeatherSub.vue';
import EventCreateSub from '@/components/EventCreateSub.vue';
const location = reactive<FLocation>({
    longitude: 114.52,
    latitude: 38.02,
})
const date = ref<Date>(new Date())
const visibleFullDateView = ref<Boolean>(true)
const showDrawer = ref<Boolean>(false) //显示黄历
const settingDrawerWidth = ref<string>(Number(700 / 4.0 * 3).toString())
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

const themeVars = ref(useThemeVars());
const fc_today_bg_color = ref(themeVars.value.primaryColor);

const INITIAL_EVENTS: EventInput[] = [
    {
        id: createEventId(),
        title: 'All-day event',
        start: todayStr
    },
    {
        id: createEventId(),
        title: 'Timed event',
        start: todayStr + 'T12:00:00'
    }
]
const events = ref(<EventInput[]>[]) // 所以事件列表
const event = ref(<EventInput>{}); // 当前的event事件
const visibleECSub = ref<Boolean>(false)
function createEventId() {
    return String(eventGuid++)
}
// date click
const handleDateSelect = (selectInfo: DateSelectArg) => {
    showDrawer.value = !showDrawer.value
    visibleFullDateView.value = true
    // let title = 'Please enter a new title for your event'
    // let calendarApi = selectInfo.view.calendar
    // calendarApi.unselect() // clear date selection
    // if (title) {
    //     calendarApi.addEvent({
    //         id: createEventId(),
    //         title,
    //         start: selectInfo.startStr,
    //         end: selectInfo.endStr,
    //         allDay: selectInfo.allDay
    //     })
    // }
}
// event.click
const handleEventClick = (clickInfo: EventClickArg) => {
    showDrawer.value = true
    visibleFullDateView.value = false
    visibleECSub.value = true
    alert(123)
    event.value = clickInfo.event as EventInput
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    // clickInfo.event.remove()
    // }
}


const addEventClick = (data: EventInput) => {
    console.log(data)
    if (data.id) {
        events.value.push(data)
    }
    visibleECSub.value = false;
    showDrawer.value = false
}
// eventsSet 设置
const handleEvents = (event: EventApi[]) => {
    currentEvents.value = event
}
const changeShowFestivals = ref(true)
const changeShowWeather = ref(false)
const weather = inject('weather', {} as WeatherValueMap)
const dayCellNewContent = () => {
    return {
        dayGridMonth: {
            titleFormat: { year: 'numeric', month: '2-digit' },
            dayCellContent(item: DayCellContentArg) {
                const date = new Date(item.date);
                const calendarViewService = new CalendarViewService();
                return calendarViewService.showView(
                    item.dayNumberText,
                    date,
                    changeShowFestivals.value,
                    changeShowWeather.value,
                    weather,
                );
            },
        },
    };
}
const calendarOptions = reactive<CalendarOptions>({
    plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin, // needed for dateClick
        listPlugin
    ],
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: events.value, // alternatively, use the `events` setting to fetch from a feed
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    eventColor: "lightgrey",
    aspectRatio: 1,
    handleWindowResize: false,
    height: 800,
    locale: zhLocale,
    events: [
        { title: 'Meeting', start: new Date() }
    ],
    select: handleDateSelect,
    eventClick: handleEventClick,
    eventsSet: handleEvents,
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
    views: {
        dayGridMonth: { // name of view
            titleFormat: {
                year: 'numeric', month: '2-digit',
                // day: '2-digit'
            },
            // other view-specific options here
            dayCellContent(item: DayCellContentArg) {
                const date = new Date(item.date);
                const calendarViewService = new CalendarViewService();
                return calendarViewService.showView(
                    item.dayNumberText,
                    date,
                    changeShowFestivals.value,
                    changeShowWeather.value,
                    weather,
                );
            },
        },
        dayGrid: {
            // options apply to dayGridMonth, dayGridWeek, and dayGridDay views
        },
        timeGrid: {
            // options apply to timeGridWeek and timeGridDay views
        },
        week: {
            // options apply to dayGridWeek and timeGridWeek views
        },
        day: {
            // options apply to dayGridDay and timeGridDay views
            titleFormat: {
                day: '2-digit'
            },
        }
    }
})
const updateEvents = (update_events: EventInput[]) => {
    // events.value = INITIAL_EVENTS
    events.value = update_events;
}
const currentEvents = ref(<EventApi[]>[])
const fullcalendar = ref(null);
const fullcalendarApi = ref<CalendarApi>({});
const handleWeekendsToggle = () => {
    calendarOptions.weekends = !calendarOptions.weekends // update a property
}

const updateColors = () => {
    calendarOptions.eventColor = themeVars.value.primaryColor;
    fc_today_bg_color.value = convertHexToRGBA(themeVars.value.primaryColor, Number(themeVars.value.opacity5));
}
const updateView = () => {
    if (fullcalendarApi.value == null) {
        fullcalendarApi.value = Object.getOwnPropertyDescriptor(fullcalendar, 'getApi')?.value();
    }
    const viewContent = dayCellNewContent();
    fullcalendarApi.changeView('dayGridMonth', viewContent['dayGridMonth'] as DateRangeInput | DateInput);
}
const convertHexToRGBA = (hex: string, opacity: number) => {
    const tempHex = hex.replace('#', '');
    const r = parseInt(tempHex.substring(0, 2), 16);
    const g = parseInt(tempHex.substring(2, 4), 16);
    const b = parseInt(tempHex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

</script>
<style lang='scss' >
@import "@/assets/css/weather_mac.scss";

h2 {
    margin: 0;
    font-size: 16px;
}

ul {
    margin: 0;
    padding: 0 0 0 1.5em;
}

li {
    margin: 1.5em 0;
    padding: 0;
}

b {
    /* used for event dates/times */
    margin-right: 3px;
}

.demo-app {
    display: flex;
    min-height: 100%;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 14px;
}

.demo-app-sidebar {
    width: 500px;
    line-height: 1.5;
    background: #eaf9ff;
    border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
    padding: 2em;
}

.demo-app-main {
    flex-grow: 1;
    padding: 3em;
}

.fc {
    /* the calendar root */
    max-width: 1100px;
    margin: 0 auto;
}



::v-deep(.fc-header-toolbar) {
    height: 64px;
    margin-bottom: 0 !important;
}

::v-deep(.fc .fc-button-primary) {
    color: var(--text-color-base);
    background-color: var(--base-color, #2C3E50);
    border-color: var(--border-color, #2C3E50);
}

::v-deep(.fc .fc-settingButton-button) {
    border-color: var(--base-color);
}

::v-deep(.fc-direction-ltr .fc-button-group > .fc-button:not(:first-child)) {
    /* margin-left: -1px; */
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin: 0 3px;
}

::v-deep(.fc-daygrid-day-top) {
    display: flex;
    text-align: center;
    justify-content: space-between;
    flex-direction: row;
    flex-wrap: wrap;
}

::v-deep(.fc-daygrid-day-chinese) {
    position: relative;
    z-index: 4;
    padding: 4px;
}

::v-deep(.fc-day-today .fc-daygrid-day-number) {
    width: 25px;
    height: 25px;
    color: var(--base-color);
    background: var(--primary-color);
    padding: 2px;
    margin: 2px;
    border-radius: 50%;
}

::v-deep(.fc-daygrid-dayweather) {
    text-align: center;
}

::v-deep(.fc-daygrid-dayweather-iconday) {
    padding-top: 4px;
    float: left;
    width: 20px;
}

::v-deep(.fc-daygrid-dayweather-temp) {
    padding-top: 4px;
    font-size: 0.6rem;
}

::v-deep(.fc-day-sat) {
    color: var(--cyan-300) !important;
}

::v-deep(.fc-day-sun) {
    color: var(--cyan-300) !important;
}
</style>
