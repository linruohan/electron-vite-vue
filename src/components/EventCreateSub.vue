<template>
    <div>EventCreateSub</div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";

</script>

<style lang="less" scoped></style>
<!-- <template>
    <n-drawer-content title="创建事件" closable>
        <n-space vertical>
            <n-input id="eventInput" v-model:value="eventText" placeholder="事件内容" />
            <n-date-picker v-model:value="dates" type="daterange" size="small" :actions="['confirm']" clearable />
        </n-space>
        <template #footer>
            <n-button type="success" @click="add">
                增加
            </n-button>
        </template>
    </n-drawer-content>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NSpace, NInput, NDatePicker, NButton, NDrawerContent } from 'naive-ui';
import EventApi, { type EventInput } from '@fullcalendar/core';

export default defineComponent({
    name: 'EventCreateSub',
    components: {
        NSpace,
        NButton,
        NInput,
        NDatePicker,
        NDrawerContent,
    },
    props: {
        event: {} as EventInput,
    },
    emits: [
        'addEventClick',
    ],
    data() {
        return {
            locationStr: '',
            eventText: '',
            dates: [Number(Date.now()), Number(Date.now())] as [number, number],
        };
    },
    mounted() {
        if (this.event != null) {
            this.eventText = this.event.title;
            this.dates = [Number(this.event.start), Number(this.event.end || this.event.start)];
        } else {
            this.eventText = '';
            this.dates = [Number(Date.now()), Number(Date.now())];
        }
    },
    methods: {
        add(): void {
            const start: Date = new Date(this.dates[0]);
            const end: Date = this.dates[1] == null ? start : new Date(this.dates[1]);
            this.$emit('addEventClick', {
                id: this.event?.id,
                title: this.eventText,
                start: start,
                end: end,
            } as EventInput);
            this.dates = [Number(Date.now()), Number(Date.now())];
            this.eventText = '';
        },
    },
});
</script>
   -->