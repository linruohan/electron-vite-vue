<template>
    <div class="login">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>请输入登录信息：</span>
                    <el-button class="button" style="color:red" text>x</el-button>
                </div>
            </template>
            <el-form ref="form" :rules="rules" :model="formInline" class="demo-form-inline">
                <el-form-item prop="telephone" label="手机: ">
                    <el-input maxlength="11" minlength="11" v-model="formInline.telephone" autocomplete="off"
                        placeholder="请输入手机号" />
                </el-form-item>
                <el-form-item prop="password" label="密码: ">
                    <el-input type="password" placeholder="请输入密码" v-model="formInline.password"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import type { FormItemRule, FormInstance } from "element-plus";
import type { InternalRuleItem } from 'async-validator';
import { ElMessage } from 'element-plus'
import { login, setToken, setUserInfo } from "@/request/api/user/user";
const router = useRouter()
type From = {
    // name: string,
    password: string,
    telephone: string
}
type Rules = {
    [K in keyof From]?: Array<FormItemRule>
}
const form = ref<FormInstance>()
const rules = reactive<Rules>({
    password: [
        {
            required: true,
            message: "请输入密码,长度在 6 到 18 个字符",
            type: "string",
            min: 6, max: 18, trigger: 'blur'

        },
    ],
    telephone: [{
        required: true,
        message: "请输入密码,长度在11个字符",
        min: 11,
        max: 11,
        trigger: 'blur'
    }],
})
const formInline = reactive<From>({
    password: '',
    telephone: ""
})

const onSubmit = () => {
    form.value?.validate((validate) => {
        if (validate) {
            login(formInline).then((res: any) => {
                // 跳转至首页
                console.log("login:onSubmit:res ", res)
                router.push('/home')
                ElMessage.info("登录成功")
                setUserInfo(res.data.user)
            }).catch((err: Error) => {
                ElMessage.error(err)
            });
        } else {
            ElMessage.error("请输入完整的用户名和密码")
        }
    })
}

</script>

<style lang="less" scoped>
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(92, 92, 177);
    font-size: large;
    font-weight: bold;
}

.login {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>