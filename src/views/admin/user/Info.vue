<template>
    <div style="padding: 20px;">
    <a-row>
      <a-col :span="5">
       <a-card
          hoverable
          style="width: 300px; height: 540px"
        >
          <img
            alt=""
            src="https://raw.githubusercontent.com/XYY1010/WebImgSrc/master/test/a.jpg"
          />
              <template class="ant-card-actions" slot="actions">
                <a-popover placement="bottom">
                  <template slot="content">
                    <p>密码设置</p>
                  </template>
                  <a-button icon="setting" @click="clickSetting"  style="border:none; background-color:#F8F9F8;" />
                </a-popover>
                <a-popover placement="bottom">
                  <template slot="content">
                    <p>基本信息修改</p>
                  </template>
                  <a-button icon="edit" @click="clickEdit" style="border:none; background-color:#F8F9F8;" />
                </a-popover>
              </template>
              <a-card-meta
                title="用户信息"
                description="用户相关信息展示" style="margin-top:10px;">
                <a-avatar slot="avatar" style="color: #f56a00; backgroundColor: #fde3cf; margin-top:10px">U</a-avatar>
              </a-card-meta>
            </a-card>
        </a-col>
        <a-col :span="16" :offset="3">
           <a-card title="用户信息" hoverable style="height: 540px">
            <a-form :autoFormCreate="(form)=>{this.form = form}">
            <a-form-item label="用户ID"  :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="userId">
                <a-input :disabled=true>
                   <a-icon slot="prefix" type='user' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item label="用户名" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="userName">
                <a-input :disabled=true>
                  <a-icon slot="prefix" type='idcard' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item label="用户类型" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="userType">
                <a-input :disabled=true>
                  <a-icon slot="prefix" type='tag-o' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item label="手机号" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="phone">
                <a-input :disabled=true>
                  <a-icon slot="prefix" type='mobile' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item label="邮箱" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="email">
                <a-input :disabled=true>
                  <a-icon slot="prefix" type='mail' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item label="地址" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="address">
                <a-input :disabled=true>
                  <a-icon slot="prefix" type='home' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
        </a-form>
            </a-card>
        </a-col>
    </a-row>

    <a-drawer
      title="密码设置"
      width=520
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px"
    >
      <a-form layout="vertical" :autoFormCreate="(form)=>{this.form = form}">
        <a-row>
          <a-col :span="3"/>
          <a-col :span="18">
            <a-form-item label="旧密码" fieldDecoratorId="oldpwd" :fieldDecoratorOptions="{ rules: [{ required: true, message: '原密码不能为空' }]}">
              <a-input placeholder="请输入原密码" type="password"/>
            </a-form-item>
          </a-col>
          <a-col :span="3"/>
        </a-row>
        <a-row>
          <a-col :span="3"/>
          <a-col :span="18">
            <a-form-item label="新密码" fieldDecoratorId="newpwd" :fieldDecoratorOptions="{ rules: [{ required: true, message: '新密码不能为空' }]}">
              <a-input placeholder="请输入新密码" v-model = "newpwd" type="password" />
            </a-form-item>
          </a-col>
          <a-col :span="3"/>
        </a-row>
        <a-row>
          <a-col :span="3"/>
          <a-col :span="18">
            <a-form-item label="重新输入密码" fieldDecoratorId="confirmnewpwd" :fieldDecoratorOptions="{ rules: [{ required: true, message: '新密码不能为空' },{validator: this.checkPassword}]}">
              <a-input placeholder="请输入新密码" type="password"/>
            </a-form-item>
          </a-col>
          <a-col :span="3"/>
        </a-row>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }"
      >
        <a-button
          :style="{
            marginRight: 8,
          }"
          @click="onClose"
        >
          关闭
        </a-button>
        &nbsp;
        <a-button htmlType='submit' type="primary" @click="handleSubmit">确认修改</a-button>
      </div>
    </a-drawer>
</div>
</template>

<script>
    export default {
        data() {
            return {
              visible: false,
              newpwd: undefined,
              userInfo: {}
            }
        }, 
        methods: {
            clickSetting() {
              this.showDrawer()
            }, 
            clickEdit() {
              this.$router.push("/admin/user/edit-form");
            },
            showDrawer() {
              this.visible = true
            },
            onClose() {
              this.visible = false
            },
            handleSubmit(e) {
              e.preventDefault();
              this.form.validateFields((err, values) => {
                if (!err) {
                  this.$axios({
                    method: 'post',
                    url: '/user/changepassword',
                    params: {
                      userName: this.userInfo.userName,
                      oldpassword: values.oldpwd,
                      newpassword: values.newpwd
                    }
                  }).then(res => {
                    let result = res.data;
                    if (result.status == 200) {
                      this.$notification.open({
                        message: "密码修改成功！",
                        description: "请重新登录"
                      });    
                      setTimeout(() => {
                        this.$router.push('/login');
                      }, 1000);
                    } else {
                      this.$notification.open({
                        message: "密码修改失败！",
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
              if (value === this.newpwd) {
                callback();
              } else {
                callback('密码不一致');
              }
            }
          }
        },
        mounted() {
            this.form.setFieldsValue(this.$store.getters.user);
            this.userInfo = this.$store.getters.user;
        }
    }
</script>

<style>
</style>