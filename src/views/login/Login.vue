<template>
    <div class="login-wrapper">
        <a-form class="login-form" @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
            <a-form-item
                    label='用户名'
                    :labelCol="{ span: 6 }"
                    :wrapperCol="{ span: 12 }"
                    fieldDecoratorId="username"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your username!' }]}"
            >
                <a-input placeholder="用户名:admin" />
            </a-form-item>
            <a-form-item
                    label='密码'
                    :labelCol="{ span: 6 }"
                    :wrapperCol="{ span: 12 }"
                    fieldDecoratorId="password"
                    :fieldDecoratorOptions="{rules: [{ required: true, message: 'Please input your password!' }]}"
            >
                <a-input placeholder="密码:123"/>
            </a-form-item>
            <a-form-item
                    :wrapperCol="{ span: 12, offset: 6 }"
            >
                <a-button type='primary' htmlType='submit'>
                    登录
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                formLayout: 'horizontal',
            }
        },
        methods: {
            handleSubmit (e) {
                e.preventDefault()
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values)
                    }
                })
            },
            handleSelectChange (value) {
                console.log(value)
                this.form.setFieldsValue({
                    note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
                })
            },
        },
    }
</script>

<style scoped lang="scss">
    .login-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #eee;

        .login-form {
            padding: 64px 0 40px;
            width: 40%;
            border-radius: 4px;
            border: 1px solid #ddd;
            background: white;
        }
    }
</style>