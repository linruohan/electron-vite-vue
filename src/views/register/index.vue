<template>
    <div class="login">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <span>请输入注册信息：</span>
                    <el-button class="button" style="color:red" text>x</el-button>
                </div>
            </template>
            <el-form ref="form" :rules="rules" :model="formInline" class="demo-form-inline">
                <el-form-item prop="name" label="用户名: ">
                    <el-input v-model="formInline.name" placeholder="请输入用户名" />
                </el-form-item>
                <el-form-item prop="telephone" label="手机: ">
                    <el-input maxlength="11" minlength="11" v-model="formInline.telephone" autocomplete="off"
                        placeholder="请输入手机号" />
                    <el-link type="success" @click="sendCode" :disabled="initData.hasBeenSend">{{ initData.sendCodeText
                    }}
                    </el-link>
                </el-form-item>
                <el-form-item prop="password" label="密码: ">
                    <el-input type="password" placeholder="请输入密码" v-model="formInline.password"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="onSubmit">注册</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, unref } from "vue";
import { useRouter } from "vue-router";
import type { FormItemRule, FormInstance } from "element-plus";
import type { InternalRuleItem } from 'async-validator';
import { ElMessage } from 'element-plus';
import { register, setToken, setUserInfo } from "@/request/api/user/user";

const router = useRouter()
type From = {
    name: string,
    password: string,
    telephone: string
}
type Rules = {
    [K in keyof From]?: Array<FormItemRule>
}
const initData = reactive({
    countDown: 0,
    sendCodeText: "验证码",
    hasBeenSend: false
})
const form = ref<FormInstance>()
// 手机号码自定义验证规则
// const telValidator = (rule: InternalRuleItem, value: any, callback: Function) => {
//     if (!value) {
//         callback(new Error("请输入手机号"));
//     } else if (!/^1[3456789]\d{9}$/.test(value)) {
//         callback(new Error("手机号格式不正确"));
//     } else {
//         callback();
//     }
// };

const rules = reactive<Rules>({
    name: [
        {
            required: false,
            message: "请输入账号",
            type: "string",
        }
    ],
    password: [
        {
            required: true,
            message: "请输入密码,长度在 6 到 12 个字符",
            type: "string",
            min: 6, max: 12, trigger: 'blur'

        },
    ],
    telephone: [{ required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3456789]\d{9}$/, message: "手机号格式不对", trigger: "blur" },],
})
const formInline = reactive<From>({
    name: "",
    password: '',
    telephone: ""
})

const onSubmit = () => {
    form.value?.validate((validate) => {
        if (validate) {
            register(formInline).then(res => {
                // 保存token
                console.log(res)
                setToken(res.data.data?.token)
                setUserInfo(res.data.data.user)
                // 跳转至首页
                ElMessage.info("注册成功")
                router.push('/home')

            }).catch((err) => {
                ElMessage.error(err.data.data.msg)
            })
        } else {
            ElMessage.error("请输入完整的用户名和密码")
        }
    })
}
// 发送验证码按钮
const sendCode = () => {
    const formRef: any = unref(form);
    formRef.validateField("telephone", (valid: boolean) => {
        if (valid) {
            // 验证通过
            let timer = setInterval(() => {
                if (initData.countDown > 0) {
                    initData.hasBeenSend = true; // 是否禁用点击事件
                    initData.countDown--; // 倒计时
                    initData.sendCodeText = initData.countDown + "秒后重新获取";
                } else {
                    initData.hasBeenSend = false;
                    initData.countDown = 60;
                    initData.sendCodeText = "重新获取";
                    clearInterval(timer);
                }
            }, 1000);
            // 发送验证码接口
            // sendCodeApi(initData.registerForm.tel);
        }
    });
};

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