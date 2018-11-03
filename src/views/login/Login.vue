<template>
  <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}" class="login-container">
    <h2 class="title">银行基本业务系统</h2>
    <a-form-item label='用户名' fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名' }]}">
      <a-input />
    </a-form-item>

    <a-form-item label='密码' fieldDecoratorId="password" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码' }]}">
      <a-input type="password" />
    </a-form-item>

    <a-form-item>
      <a-button type='primary' htmlType='submit' class="loginButton">
        登录
      </a-button>
    </a-form-item>

    <a-form-item>
      <a-button class="register" @click="register">注册</a-button>
      <a-button class="register" @click="showModal">修改密码</a-button>
    </a-form-item>

    <a-modal title="修改密码" :visible="visible" @ok="handleOk" @cancel="handleCancel">
      <a-form :autoFormCreate="(form)=>{this.detailform = form}">
        <a-form-item label='用户名' fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名' }]}">
          <a-input />
        </a-form-item>
        <a-form-item label='旧的密码' fieldDecoratorId="oldpassword" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入旧的密码' }]}">
          <a-input type="password" />
        </a-form-item>
        <a-form-item label='新的密码' fieldDecoratorId="newpassword" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入新的密码' }]}">
          <a-input type="password" />
        </a-form-item>
      </a-form>
    </a-modal>
  </a-form>

</template>

<script>
  export default {
    name: "Login",
    data() {
      return {
        formLayout: "horizontal",
        visible: false
      };
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$axios({
              method: 'post',
              url: '/user/login',
              params: {
                username: values.name,
                password: values.password
              }
            }).then(res => {
              console.log(res);
              let result = res.data;
              if (result.status == 200) {
                this.$notification.open({
                  message: "登录成功",
                  description: '即将进行跳转'
                });
                this.$store.commit('initUser', {
                  user: result.data
                });
                setTimeout(() => {
                  this.$router.push('/admin/user');
                }, 2000);
              } else {

                this.$notification.open({
                  message: "登录失败",
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

        });
      },
      showModal(){
        this.visible=true;
      },
      register() {
        this.$router.push('/register');
      },
      // changePassword(e) {
      //   e.preventDefault();
       
      // },
      handleOk(){
         this.detailform.validateFields((err, values) => {
          if (!err) {
            this.$axios({
              method: 'post',
              url: '/user/changepassword',
              params: {
                username: values.name,
                oldpassword: values.oldpassword,
                newpassword: values.newpassword
              }
            }).then(res => {
              let result = res.data;
              if (result.status == 200) {
                this.$notification.open({
                  message: "修改成功",
                  description: '请重新登录'
                });
                this
              } else {
                this.$notification.open({
                  message: "修改失败",
                  description: result.msg
                });
                this.detailform.resetFields();
              }
            }).catch(err => {
              console.log(err);
              this.$notification.open({
                message: "错误",
                description: "服务器开小差了,请稍后再试"
              });
            })
          }

        });
      },
      handleCancel() {
        this.visible = false;
      }
    },
    mounted() {

    }
  };
</script>
<style scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 450px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .title {
    margin: 0px auto 20px auto;
    text-align: center;
    color: #505458;
  }

  .loginButton {
    width: 380px;
    /* margin: 0px auto 20px auto; */
  }

  .register {
    float: right;
    border-width: 0px;

  }
</style>