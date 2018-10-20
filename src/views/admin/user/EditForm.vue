<template>
    <div class="user-edit-form-wrapper">
        <h1 class="user-edit-form-title">用户表单</h1>
        <Form class="user-edit-form" :model="form" :label-width="80">
            <FormItem label="User ID">
                <Input v-model="form.userID" readonly></Input>
            </FormItem>
            <FormItem label="Password">
                <Input v-model="form.password" type="password" placeholder="Enter password"></Input>
            </FormItem>
            <FormItem label="userType">
                <Input v-model="form.userType" placeholder="Enter user type"></Input>
            </FormItem>
            <FormItem label="Input">
                <Input v-model="form.phone" type="phone" placeholder="Enter phone"></Input>
            </FormItem>
            <FormItem label="Input">
                <Input v-model="form.email" type="email" placeholder="Enter phone"></Input>
            </FormItem>
            <FormItem label="Input">
                <Input v-model="form.address" placeholder="Enter address"></Input>
            </FormItem>
            <FormItem>
                <Button @click="submit" type="primary">提交</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "UserEditForm",
        data() {
            return {
                form: {
                    userID: '1',
                    userName: '张三',
                    password: '123',
                    userType: 'VIP',
                    phone: '1234567890',
                    address: '12400 Imperial Hwy, Norwalk, CA 90650',
                    email: 'zhangsuan@qq.com'
                }
            }
        },
        methods: {
            submit() {
                console.log('Submit the form' + this.form)
            }
        }
    }
</script>

<style scoped lang="scss">
    .user-edit-form-wrapper {
        .user-edit-form-title {
            text-align: center;
            padding: 30px 0;
        }

        .user-edit-form {
            margin: 0 auto;
            width: 80%;
        }
    }
</style>