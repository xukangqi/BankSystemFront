<template>
    <div style="background-color: #ececec; padding: 20px; margin: 10px 300px 10px 300px;">
        <row>
            <a-col :span="8"/>
            <a-col :span="8">
                <h1 style="padding:30px; text-align:center" >用户表单</h1>
            </a-col>
            <a-col :span="8"/>
        </row>
       <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
            <a-form-item label="用户ID"  :labelCol="{ span: 7 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="userid">
                <a-input :disabled=true>
                   <a-icon slot="prefix" type='user' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item label="用户名" :labelCol="{ span: 7 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="username">
                <a-input :disabled=true>
                  <a-icon slot="prefix" type='idcard' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item label="用户类型" :labelCol="{ span: 7 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="usertype">
                <a-input :disabled=true>
                  <a-icon slot="prefix" type='tag-o' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item label="手机号" :labelCol="{ span: 7 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="phone" :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入用户手机号' },{validator: this.checkTelephone}]}">
                <a-input>
                  <a-icon slot="prefix" type='mobile'/>
                </a-input>
            </a-form-item>
            <a-form-item label="邮箱" :labelCol="{ span: 7 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="email" :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入用户邮箱' },{validator: this.checkEmail}]}">
                <a-input>
                  <a-icon slot="prefix" type='mail'/>
                </a-input>
            </a-form-item>
            <a-form-item label="地址" :labelCol="{ span: 7 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="address">
                <a-input>
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
            checkTelephone(rule, value, callback) {
                if (value.length == 0) {
                  callback();
                }
                if (!/^1[34578]\d{9}$/.test(value)) {
                  callback("手机号码错误");
                } else {
                  callback();
                }
            },
            checkEmail(rule, value, callback) {
                if (value.length == 0) {
                  callback();
                }
                if (!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
                  callback("邮箱号错误");
                } else {
                  callback();
                }
            }
        },
        mounted() {
            this.form.setFieldsValue({
                    userid: '1',
                    username: '张三',
                    usertype: 'VIP',
                    phone: '1234567890',
                    address: '12400 Imperial Hwy, Norwalk, CA 90650',
                    email: "zhangsuan@qq.com"
            });
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