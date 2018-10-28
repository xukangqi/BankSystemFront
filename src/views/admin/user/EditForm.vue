<template>
    <div style="padding: 20px;">
        <row>
            <a-col :span="8"/>
            <a-col :span="8">
                <h1 style="padding:30px; text-align:center" >用户表单</h1>
            </a-col>
            <a-col :span="8"/>
        </row>
       <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
            <a-form-item label="用户ID"  :labelCol="{ span: 7 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="userId">
                <a-input :disabled=true>
                   <a-icon slot="prefix" type='user' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item label="用户名" :labelCol="{ span: 7 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="userName">
                <a-input :disabled=true>
                  <a-icon slot="prefix" type='idcard' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item label="用户类型" :labelCol="{ span: 7 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="userType">
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
                  this.$axios({
                    method: 'post',
                    url: '/user/changeinfo',
                    params: {
                      userId: values.userId,
                      userName: values.userName,
                      userType: values.userType,
                      phone: values.phone,
                      email: values.email,
                      address: values.address
                    }
                  }).then(res => {
                    let result = res.data;
                    if (result.status == 200) {
                      this.$notification.open({
                        message: "用户基本信息修改成功！",
                        description: ""
                      });
                    } else {
                      this.$notification.open({
                        message: "用户基本信息修改失败！",
                        description: result.msg
                      });
                    }
                  }).catch(err => {
                    console.log(err);
                    this.$notification.open({
                      message: "错误",
                      description: "服务器开小差了,请稍后再试"
                    });
                  })
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
             this.form.setFieldsValue(this.$store.getters.user);
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