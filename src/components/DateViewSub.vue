<template>
    <el-card class="lunarData">
        <div class="yangli">
            {{ lunarData.yangliString.replace('00:00:00', '') }}
        </div>
        <div class="nongliString">
            {{ lunarData.nongliString }}
        </div>
        <div class="header" bordered>
            <el-tag type="success" class="yi">
                宜
            </el-tag>
            <el-tag v-for="item in lunarData.yi" :key="item" type="success">
                {{ item }}
            </el-tag>
        </div>
        <div class="onecngroup">
            <div v-for="item in lunarData.ganzhi" :key="item" class="onecn">
                {{ item }}
            </div>
        </div>

        <div bordered position="absolute">
            <el-tag type="danger" class="ji">
                忌
            </el-tag>
            <el-tag v-for="item in lunarData.ji" :key="item" type="danger" round>
                {{ item }}
            </el-tag>
        </div>
    </el-card>
</template>
  
<script setup lang="ts">
import { ref, computed } from 'vue';
import LunarService, { LunarServiceResult } from '@/request/api/weather/LunarService';
const props = defineProps({
    date: Date,
})
const lunarService = ref(new LunarService(new Date()));
const lunarData = computed<LunarServiceResult>(() => {
    lunarService.value = new LunarService(props.date);
    return lunarService.value.getDateViewDate();
})

</script>
<style scoped lang="scss">
@import "@/assets/css/weather_mac.scss";

.lunarData {
    background-color: inherit;
}

.yangli {
    display: flex;
    justify-content: center;
    font-size: 1.5em;
    color: rgba(232, 234, 237, 1);
}

.el-card {
    border: 1px solid #004add;
}

.el-card__body {
    padding: unset !important;
}

.el-tag {
    background-color: #272827;
    border-color: black;
}

.nongliString {
    display: flex;
    justify-content: center;
    font-size: 2.5em;
    color: #825656;
}

.yi {
    background: rgb(72, 94, 238);
    border-radius: 25px;
    height: 25px;
    color: rgba(232, 234, 237, 1);
}

.ji {
    background: rgb(204, 111, 111);
    border-radius: 25px;
    height: 25px;
    color: rgba(232, 234, 237, 1);
}

.onecngroup {
    display: flex;
    justify-content: center;
}

.onecn {
    margin: 0 12px;
    // width: 1.4rem;
    // height: 33%;
    font-size: 1.4rem;
    color: rgba(232, 234, 237, 1);
}
</style>
  