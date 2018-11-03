<template>
  <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}" class="login-container">
    <h2 class="title">用户注册</h2>
    <a-form-item label='用户名' fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名' }]}">
      <a-input />
    </a-form-item>
    <a-form-item label='手机号' fieldDecoratorId="phone" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入手机号' }]}">
      <a-input />
    </a-form-item>
    <a-form-item label='邮箱' fieldDecoratorId="email" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入用户名' }]}">
      <a-input />
    </a-form-item>
    <a-form-item label='类型'  fieldDecoratorId="userType"
      :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入你的类型' }
        ]
        }">
      <a-select defaultValue='1'>
        <a-select-option value='1'>银行员工</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label='所在地区'  fieldDecoratorId="address"
      :fieldDecoratorOptions="{rules: [
           {required: true, message: '请选择所在地区' }]
        }">
      <a-cascader :options="address" placeholder="请选择你所在的地址" />
    </a-form-item>
    <a-form-item label='详细地址' fieldDecoratorId="detailAddress"
      :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入详细地址' }]
        }">
      <a-input />
    </a-form-item>
    <a-form-item label='账户密码' fieldDecoratorId="password"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账户密码' }]}">
      <a-input type="password" v-model="password" />
    </a-form-item>
    <a-form-item label='重复账户密码'  fieldDecoratorId="password2"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请再次输入账户密码'},{validator: this.checkPassword}]}">
      <a-input type="password" />
    </a-form-item>

    <a-form-item>
      <a-button type='primary' htmlType='submit' class="loginButton">
        注册
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  import addressdata from '../../db/generateData.js'
  const {
    address
  } = addressdata
  export default {
    name: "Register",
    data() {
      return {
        address,
        password: undefined,
        formLayout: "horizontal"
      };
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
           let addr = '';
                        for (let i = 0; i < values.address.length; i++) {
                            addr += values.address[i];
                        }
                        addr += values.detailAddress;
          if (!err) {
            this.$axios({
              method: 'post',
              url: '/user/register',
              params: {
                userName: values.name,
                password: values.password,
                phone:values.phone,
                email:values.email,
                address:addr,
                userType:values.userType
              }
            }).then(res => {
              let result = res.data;
              if (result.status == 200) {
                this.$notification.open({
                  message: "注册成功",
                  description: '注册成功'
                });    
                setTimeout(() => {
                  this.$router.push('/login');
                }, 1000);
              } else {
                this.$notification.open({
                  message: "注册失败",
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
      checkPassword(rule, value, callback) {
        if (typeof (value) == undefined) {
          callback('请再次输入密码');
        } else {
          if (value === this.password) {
            callback();
          } else {
            callback('密码不一致');
          }
        }
      },
      checkEmail(rule, value, callback) {
        var re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if (typeof (value) == undefined) {
          callback('请输入邮箱');
        }
        if (re.test(value)) {
          callback();
        } else {
          callback('邮箱格式错误');
        }
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
    width: 550px;
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
    width: 480px;
    /* margin: 0px auto 20px auto; */
  }
</style>