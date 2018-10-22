<template>
    <div style="background-color: #ececec; padding: 20px;">
    <a-row>
      <a-col :span="5">
       <a-card
          hoverable
          style="width: 300px;"
        >
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
              <template class="ant-card-actions" slot="actions">
                <a-icon type="setting" />
                <a-icon type="edit" />
              </template>
              <a-card-meta
                title="用户信息"
                description="用户相关信息展示" style="margin-top:20px;">
                <a-avatar slot="avatar" style="color: #f56a00; backgroundColor: #fde3cf; margin-top:10px">U</a-avatar>
              </a-card-meta>
            </a-card>
        </a-col>
        <a-col :span="1"></a-col>
        <a-col :span="18">
           <a-card title="用户信息" :bordered="false" hoverable>
            <a-form :autoFormCreate="(form)=>{this.form = form}">
            <a-form-item label="用户ID"  :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
                <a-input :value="userID" :disabled=true>
                   <a-icon slot="prefix" type='user' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item label="用户类型" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
                <a-input :value="userType" :disabled=true>
                  <a-icon slot="prefix" type='idcard' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item label="手机号" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
                <a-input :value="phone" :disabled=true>
                  <a-icon slot="prefix" type='mobile' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item label="邮箱" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
                <a-input :value="email" :disabled=true>
                  <a-icon slot="prefix" type='mail' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item label="地址" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }">
                <a-input :value="address" :disabled=true>
                  <a-icon slot="prefix" type='home' style="color:rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
        </a-form>
            </a-card>
        </a-col>
    </a-row>

</div>
</template>

<script>
    export default {
        data() {
            return {
                userID: '1',
                userName: '张三',
                password: '123',
                userType: 'VIP',
                phone: '1234567890',
                address: '12400 Imperial Hwy, Norwalk, CA 90650',
                email: 'zhangsuan@qq.com'
            }
        }, 
        methods: {
            
        },
        mounted() {
            
        }
    }
</script>

<style>
</style>