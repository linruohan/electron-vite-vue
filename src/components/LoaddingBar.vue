<template>
    <div class="wraps">
        <div ref="bar" class="bar">
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted } from "vue";


let speed = ref<number>(1)
let bar = ref<HTMLElement>()
let timer = ref<number>(0)

const startLoading = () => {
    speed.value = 1
    let dom = bar.value as HTMLElement
    timer.value = window.requestAnimationFrame(function fn() {
        if (speed.value < 90) {
            speed.value += 1
            dom.style.width = speed.value + "%"
            timer.value = window.requestAnimationFrame(fn)
        } else {
            speed.value = 1
            window.cancelAnimationFrame(timer.value)
        }
    })
}

const endLoading = () => {
    let dom = bar.value as HTMLElement
    setTimeout(() => {
        window.requestAnimationFrame(() => {
            speed.value = 100
            dom.style.width = speed.value + "%"
        })
    }, 500);

}

defineExpose({
    startLoading, endLoading
})

</script>

<style lang="less" >
.wraps {
    position: fixed;
    top: 0;
    width: 100%;
    height: 2px;

    .bar {
        height: inherit;
        width: 0px;
        background-color: green;
    }
}
</style>
