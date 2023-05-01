<template>
    <div class='calendar'>
        <div class='demo-app-main'>
            <FullCalendar ref="fullcalendar" class='fullcalendar' :options='calendarOptions' style="">
                <template v-slot:eventContent='arg'>
                    <b>{{ arg.timeText }}</b>
                    <i>{{ arg.event.title }}</i>
                </template>
            </FullCalendar>
            <div class='demo-app-sidebar-section events'>
                <h2>All Events ({{ currentEvents.length }})</h2>
                <el-table :data="currentEvents.slice((currentPage - 1) * pagesize, currentPage * pagesize)" height="355"
                    style="width: 100%;background: rgb(53, 54, 58);  color: rgba(232, 234, 237, 1);">
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column prop="title" label="日程" width="180"> </el-table-column>
                    <el-table-column prop="startStr" label="日期" width="120"> </el-table-column>
                    <el-table-column label="操作">
                        <template v-slot:default="scope">
                            <el-icon class="event-oprate-icon">
                                <Edit @click="eventEdit(scope.row)" />
                            </el-icon>
                            <el-icon class="event-oprate-icon">
                                <Delete @click="eventDelete(scope.row)" />
                            </el-icon>
                            <el-icon class="event-oprate-icon">
                                <Search @click="eventSearch(scope.row)" />
                            </el-icon>
                        </template>

                    </el-table-column>
                </el-table>
                <el-pagination hide-on-single-page background layout="prev, pager, next,total" :total="currentEvents.length"
                    :page-size="pagesize" @current-change="current_change"></el-pagination>
            </div>
        </div>
        <div class='demo-app-sidebar'>
            <div class='demo-app-sidebar-section'>
                <label>
                    <input type='checkbox' :checked='calendarOptions.weekends' @change='handleWeekendsToggle' />
                    切换周末
                </label>
            </div>
            <div class='demo-app-sidebar-section'>
                <WeatherSub />
            </div>
            <div class='demo-app-sidebar-section'>
                <DateViewSub :date="date" />
            </div>
            
            <div class='demo-app-sidebar-section'>
                <!-- <event-create-sub v-model:event="curEvent" @add-event-click="addEventClick" /> -->
            </div>

        </div>
    </div>
</template>

<script lang='ts' setup>
import { reactive, onMounted, ref } from 'vue'
// fullcalendar
import FullCalendar from '@fullcalendar/vue3'
import {
    EventApi,
    CustomButtonInput,
    CalendarApi,
    CalendarOptions,
    DateSelectArg,
    EventClickArg,
    EventInput,
    EventSourceInput,
    DateRangeInput,
    DateInput,
    DayCellContentArg
} from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import zhLocale from '@fullcalendar/core/locales/zh-cn';
// import type {
//     EventApi,
//     CustomButtonInput,
//     CalendarApi,
//     CalendarOptions,
//     DateSelectArg,
//     EventClickArg,
//     EventInput,
//     EventSourceInput,
//     DateRangeInput,
//     DateInput,
//     DayCellContentArg,
// } from '@fullcalendar/vue3';

import { Document, Delete, View, Edit, Search, Setting, Location, Menu } from "@element-plus/icons-vue";
// services
import type { FLocation, WeatherResult } from '@/request/module/weather/weather';
import DateViewSub from '@/components/DateViewSub.vue';
import EventCreateSub from '@/components/EventCreateSub.vue';
import store from '@/utils/store'

// event
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today
const createEventId = () => {
    return String(eventGuid++)
}
const INITIAL_EVENTS = ref<EventInput[]>([
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
])
// =============end of events
const date = ref<Date>(new Date())
let pagesize = ref(5)//指定展示多少条
let currentPage = ref(1)//当前页码
const current_change = (e: number) => {
    currentPage.value = e;
}

onMounted(() => {
    setTimeout(function () {
        window.dispatchEvent(new Event('resize'));
    }, 1);
});
const events = ref(<EventInput[]>[]) // 所有的事件列表
const curEvent = ref(<EventInput>{}); // 当前的event事件

// 周末显示切换
const handleWeekendsToggle = () => {
    calendarOptions.weekends = !calendarOptions.weekends // update a property
}
// 日历：日期点击事件
const handleDateSelect = (selectInfo: DateSelectArg) => {
    // 设置选择的日期
    date.value = selectInfo.start

    // 添加事件
    let calendarApi = selectInfo.view.calendar
    let title = 'Please enter a new title for your event'
    calendarApi.unselect() // clear date selection
    if (title) {
        calendarApi.addEvent({
            id: createEventId(),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
        })
    }
}
// 事件点击
const handleEventClick = (clickInfo: EventClickArg) => {
    curEvent.value = clickInfo.event as EventInput

    // 事件删除
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    // clickInfo.event.remove()
    // }
}
const addEventClick = (data: EventInput) => {
    console.log(data)
    if (data.id) {
        events.value.push(data)
    }
}
const currentEvents = ref<EventApi[]>([] as EventApi[])
// eventsSet 设置
const handleEvents = (events: EventApi[]) => {
    currentEvents.value = events
}
const changeCurrentEvent = (row: EventInput) => {
    curEvent.value = row
}
const eventEdit = (row: EventInput) => {
    console.log(row)
}
const eventDelete = (row: EventInput) => {

}
const eventSearch = (row: EventInput) => {

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
    initialEvents: INITIAL_EVENTS.value, // alternatively, use the `events` setting to fetch from a feed

    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    // eventColor: "lightgrey",
    aspectRatio: 1,
    handleWindowResize: true,
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
            // dayCellContent(item: DayCellContentArg) {
            //     const date = new Date(item.date);
            //     const calendarViewService = new CalendarViewService();
            //     return calendarViewService.showView(
            //         item.dayNumberText,
            //         date,
            //         changeShowFestivals.value,
            //         changeShowWeather.value,
            //         weather,
            //     );
            // },
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
    events.value = update_events;
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

.fullcalendar {
    font-family: LXGW WenKai;
    font-size: 15px;
    // background-color: rgb(53, 54, 58);
    // color: rgba(232, 234, 237, 1);
    height: 500px !important;
}

.fc {
    max-width: unset !important;
}

.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
    background: rgb(90, 93, 104) !important;
    color: rgba(232, 234, 237, 1) !important;
}

.el-pagination.is-background .btn-next.is-active,
.el-pagination.is-background .btn-prev.is-active,
.el-pagination.is-background .el-pager li.is-active {
    background: #ed5b8c !important;
    color: rgb(0, 0, 0) !important;
}

.calendar {
    display: flex;
    min-height: 100%;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 14px;
    background: rgb(53, 54, 58);
    color: rgba(232, 234, 237, 1);
}

.el-table {
    --el-table-text-color: rgba(232, 234, 237, 1);
    --el-table-header-text-color: rgba(232, 234, 237, 1);
    --el-table-header-bg-color: rgb(47, 74, 248);
    --el-table-bg-color: rgb(53, 54, 58);
    --el-table-tr-bg-color: rgb(53, 54, 58);
    --el-table-row-hover-bg-color: #272827;
}

.el-icon {
    color: rgba(232, 234, 237, 1)
}

.event-oprate-icon {
    color: rgba(232, 234, 237, 1);
    margin: 0 12px;
}

.event-oprate-icon:hover {
    color: black;
    background: green;
    margin: 0 12px;
    cursor: pointer;
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
    // background: rgb(53, 54, 58);
    // color: rgba(232, 234, 237, 1);
    border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section.events {
    border: 2px solid #8d3147;
    border-radius: 8px !important;
}

.demo-app-sidebar-section {
    padding: .2em;
}

.demo-app-main {
    flex-grow: 1;
    padding: .3em;
}

.fc .fc-daygrid-day.fc-day-today {
    background-color: rgb(29 82 201 /76%);
}

.fc {
    /* the calendar root */
    max-width: 1100px;
    margin: 0 auto;
}

.event-start {
    background-color: #2C3E50;
    border-radius: 20px;
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
