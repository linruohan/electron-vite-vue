<script setup lang="ts">
import { reactive, ref, computed } from "vue";
type TreeList = {
    name: string,
    icon?: string,
    children?: TreeList[] | []
}
type Props = {
    data?: TreeList[]
}
defineProps<Props>()
const emit = defineEmits(['onClick'])
const clickItem = (item: TreeList) => {
    emit('onClick', item)
}
</script>
<script lang="ts">
export default {
    name: "TreeItem"
}
</script>
<template>
    <div style="margin-left:10px">
        <div @click.stop="clickItem(item)" v-for="(item, index) in data" :key="index">
            {{ item.name }}
            <TreeItem v-if="item?.children?.length" :data="item.children" @on-click="clickItem">
            </TreeItem>
        </div>
    </div>
</template>


<style lang="less" scoped>
</style>
