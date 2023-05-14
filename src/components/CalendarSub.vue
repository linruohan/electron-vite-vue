<template>
    <FullCalendar ref="fullcalendar" class='fullcalendar' :options="calendarOptions">
        <template #eventContent='arg'>
            <b>{{ arg.timeText }}</b>
            <i>{{ arg.event.title }}</i>
        </template>
    </FullCalendar>
</template>

<script setup lang='ts'>
import { ref, onMounted, computed } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import type { CustomButtonInput, EventSourceInput, EventInput, EventApi, CalendarApi, CalendarOptions, DateSelectArg, EventClickArg } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import listPlugin from '@fullcalendar/list'
import momentPlugin from '@fullcalendar/moment'
import scrollgridPlugin from '@fullcalendar/scrollgrid'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import zhLocale from '@fullcalendar/core/locales/zh-cn'

const props = defineProps({
    events: {
        type: Array,
        default: [] as EventInput[],
    },
})
const emit = defineEmits([
    'dateClick',
    'eventClick',
    'eventsSet',
])
const fullcalendar = ref(null);
let fullcalendarApi = ref<CalendarApi>();
onMounted(() => {
    fullcalendarApi = Object.getOwnPropertyDescriptor(fullcalendar, 'getApi')?.value();
});

const events = computed(() => {
    if (fullcalendarApi == null) {
        fullcalendarApi = Object.getOwnPropertyDescriptor(fullcalendar, 'getApi')?.value();
    }
    (fullcalendarApi as any)?.removeAllEventSources();
    (fullcalendarApi as any)?.addEventSource(events as EventSourceInput);
})
const dateClick = (selectInfo: DateSelectArg) => {
    emit('dateClick', selectInfo);
}
const eventClick = (clickInfo: EventClickArg): void => {
    emit('eventClick', clickInfo);
}
const eventsSet = (clickInfo: EventClickArg): void => {
    emit('eventsSet', clickInfo);
}
const settingClick = () => { }
const calendarOptions = ref<any>({
    plugins: [
        momentPlugin,
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin,
        resourceTimeGridPlugin,
        resourceTimelinePlugin,
        scrollgridPlugin,
        listPlugin
    ],
    customButtons: {
        settingButton: {
            icon: 'setting',
            click: settingClick,
        } as CustomButtonInput,
    } as unknown,
    headerToolbar: {
        left: 'settingButton,prev,mothTitle,next,today',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth,timeline'
    },
    nowIndicator: true, // 是否显示当前时间轴
    allDaySlot: false,  // 是否显示全天
    slotEventOverlap: true, // 事件是否可重叠
    editable: false,  // 能否编辑事件。如果需要拖拽事件，必须开启它
    droppable: true,   // 是否把其它日历上的事件拖拽到这个日历上
    selectOverlap: false, // 用户选择时能否重叠到事件上, selectable必须为true才生效
    unselectAuto: true, // 选中时，点击页面其它位置是否取消选中
    selectable: true, // 允许用户点击或拖拽选中
    dayHeaders: true, // 是否显示日期标题
    dayMinWidth: 10,  // 日最小宽度，如果日期单元格没办法满足，会出现水平滚动条
    refetchResourcesOnNavigate: true, // 当用户切换不同视图时，是否重新加载数据
    resourceOrder: 'index', // 资源按照index属性排序
    locale: zhLocale, // 中英文
    initialView: "dayGridMonth", // 默认视图
    initialEvents: props.events, // alternatively, use the `events` setting to fetch from a feed
    schedulerLicenseKey: "schedulerLicenseKey...", // key,需要花钱
    height: '500', // 日历整体高度
    selectMirror: true,
    dayMaxEvents: false, // 在dayGrid视图中如果每个单元格事件超出单元格会出现'+more'
    weekends: true,
    eventColor: "green",
    // aspectRatio: 1,
    handleWindowResize: true,
    events: [
        { title: 'Meeting', start: new Date() }
    ],
    select: dateClick,
    eventClick: eventClick,
    eventsSet: eventsSet,
    eventShortHeight: 15, // 具有最小事件的样式
    slotDuration: "00:15", // 事件轴以15分钟为一刻度
    eventMinHeight: 15, // 事件最小高度
    slotLabelFormat: 'HH:mm', // 资源视图的事件格式
    eventTimeFormat: 'HH:mm', // 事件事件格式
    resourceAreaWidth: '280px', // 横轴资源视图的左侧列表宽度
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
    // 每个视图不同显示的日期格式
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    // 出现+more会调用该回调。返回值为：文字或者DOM
        moreLinkContent:  (info) => this.$t('schedule.more') + info.num + this.$t('schedule.item'), 
        // 点击+more触发该回调
        moreLinkClick: this.eventLimitClickFun, 
        // title标题文本回调。返回值为：文本和DOM
        dayHeaderContent: this.columnHeaderHtmlFun, 
        // 取消选择回调
        unselect: this.unselectCallback,
        // 日期切换回调。注意：切换视图也会调用该回调。
        datesSet: this.handleDatesRender,
        // 点击事件
        eventClick: this.handleEventClick,
        // 切换视图
        viewDidMount: this.handleViewSkeletonRender,
        // 月视图每个单元格回调。返回值：文字或DOM
        dayCellContent: (info) => {
          return {html: `<a class="fc-daygrid-day-number">${info.dayNumberText.replace('日','')}</a>`}
        },
        // 现在指示器(nowIndicator)回调 
        nowIndicatorDidMount: this.nowIndicatorDidMount,
        // 到当前时间指示器时间显示。如果有返回值（文本或DOM）：则显示返回值
        nowIndicatorContent: this.setNowIndicatorTime,
        // 日历尺寸发生改变
        windowResize: (arg) => {
          this.fullcalendarResize(arg.view.type)
        }
    */
})
</script>


<style lang='scss' >
@import "@/assets/css/weather_mac.scss";

.fc-license-message {
    display: none !important;
}

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
    // background: rgb(53, 54, 58);
    // color: rgba(232, 234, 237, 1);
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

/* 可以进行这么设置 找到col标签
https://juejin.cn/post/7036175157274083364
设置垂直资源视图（resourceTimeGridDay）左侧时间宽度
*/
.fc-scrollgrid>colgroup>col {
    min-width: 92px !important;
}
</style>
