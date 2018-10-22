<template>
    <div style="background-color: #ececec; padding: 20px;">
        <row>
            <a-col :span="8"/>
            <a-col :span="8">
                <h1 style="padding:30px; text-align:center" >用户表单</h1>
            </a-col>
            <a-col :span="8"/>
        </row>
        <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
            <a-form-item label="用户ID"  :labelCol="{ span: 7 }" :wrapperCol="{ span: 12 }"
                :fieldDecoratorId="userid">
                <a-input :value="userID" :disabled=true>
                   <a-icon slot="prefix" type='user' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item label="用户类型" :labelCol="{ span: 7 }" :wrapperCol="{ span: 12 }" :fieldDecoratorId="usertype">
                <a-input :value="userType" :disabled=true>
                  <a-icon slot="prefix" type='idcard' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item label="手机号" :labelCol="{ span: 7 }" :wrapperCol="{ span: 12 }" :fieldDecoratorId="phoneNum">
                <a-input :value="phone">
                  <a-icon slot="prefix" type='mobile'/>
                </a-input>
            </a-form-item>
            <a-form-item label="邮箱" :labelCol="{ span: 7 }" :wrapperCol="{ span: 12 }" :fieldDecoratorId="email">
                <a-input :value="Email">
                  <a-icon slot="prefix" type='mail'/>
                </a-input>
            </a-form-item>
            <a-form-item label="地址" :labelCol="{ span: 7 }" :wrapperCol="{ span: 12 }" :fieldDecoratorId="address">
                <a-input :value="Address">
                  <a-icon slot="prefix" type='home'/>
                </a-input>
            </a-form-item>
             <a-form-item :wrapperCol="{ span: 12, offset: 7 }">
                <a-button type='primary' icon="pushpin" htmlType='submit'>
                提交修改
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
    export default {
        name: "UserEditForm",
        data() {
            return {
                    userID: '1',
                    userName: '张三',
                    password: '123',
                    userType: 'VIP',
                    phone: '1234567890',
                    Address: '12400 Imperial Hwy, Norwalk, CA 90650',
                    Email: 'zhangsuan@qq.com'
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
            }
        },
        created() {
            console.log(this.form.getFieldsValue())
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