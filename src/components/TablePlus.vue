<template>
    <el-table v-bind="$attrs" :data="tableData">
        <el-table-column v-for="item in column" :key="item.prop" v-bind="item">
            <template #default="scope" v-if="$slots[item.prop]">
                <slot :name="item.prop" v-bind="scope"></slot>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup lang='ts'>
interface TableData {
    [propName: string]: any;
}
interface Column {
    prop: string;
    label: string;
    [propName: string]: any;
}
defineProps<{
    tableData: TableData[];
    column: Column[];
}>();
</script>

<style lang='scss' scoped></style>