<template>
    <div class="login-wrapper">
        <Form class="login-form" :model="form" :label-width="80">
            <h1 class="login-title">登录</h1>
            <FormItem label="User ID">
                <Input v-model="form.admin"></Input>
            </FormItem>
            <FormItem label="Password">
                <Input v-model="form.password" type="password" placeholder="Enter password"></Input>
            </FormItem>
            <FormItem>
                <Button @click="login">登录</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                form: {
                    admin: 'admin',
                    password: '123'
                }
            }
        },
        methods: {
            login() {
                console.log('Login with form' + JSON.stringify(this.form))
            }
        }
    }
</script>

<style scoped lang="scss">
    .login-wrapper {
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;

        .login-form {
            .login-title {
                padding-top: 24px;
                padding-bottom: 10px;
                text-align: center;
            }
            padding: 0 40px;
            margin: 0 auto;
            width: 40%;
            border: 1px solid silver;
            border-radius: 4px;
        }
    }
</style>