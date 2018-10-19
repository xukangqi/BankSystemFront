n<template>
  <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
    <a-form-item label='申请人' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="name"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入申请人姓名' }]}">
      <a-input />
    </a-form-item>
    <a-form-item label='身份证' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="id"
      :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入申请人身份证号' },{validator: this.checkID}
        ]
        }">
      <a-input />
    </a-form-item>
    <a-form-item label='手机号' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="telephone"
      :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入申请人手机号' },{validator: this.checkTelephone}
        ]
        }">
      <a-input/>
    </a-form-item>
    <a-form-item label='账号' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="account"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入需要申请贷款的银行账号' }]}">
      <a-input />
    </a-form-item>
    <a-form-item label='贷款金额' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="amount"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入需要贷款金额' }]}">
      <a-input />
    </a-form-item>
    <a-form-item label='贷款期限' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="time"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '贷款期限' }]}">
      <a-input />
    </a-form-item>

    <a-form-item label='贷款利率' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="hello">
      <a-popover title="规定贷款利率">
        <template slot="content">
          <p>一年期以上:{{interestRate.one}}%</p>
          <p>三年期以上:{{interestRate.three}}%</p>
          <p>五年期以上:{{interestRate.five}}%</p>
        </template>
        <a-input  addonAfter="%" :value=this.radio />
      </a-popover>
    </a-form-item>
    <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
      <a-button type='primary' htmlType='submit'>
        Submit
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  export default {
    name: "LoadApply",
    data() {
      return {
        formLayout: "horizontal",
        interestRate: {
          // updateTime:'',
          one: 0,
          three: 0,
          five: 0
        },
        radio: 0
      };
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log("Received values of form: ", values);
            console.log(this.radio);
          }
        });
      },
      // handleSelectChange(value) {
      //     console.log(value)
      //     this.form.setFieldsValue({
      //         note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      //     })
      // }.
      handleIdChange(value) {
        console.log(value);
      },
      checkID(rule, value, callback) {
        if (value.length == 0) {
          callback();
        }
        let re15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
        let re18 = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
        if (value.length == 18) {
          if (re18.test(value)) {
            callback();
          } else {
            callback("身份证号码格式不正确");
          }
        } else if (value.length == 15) {
          if (re15.test(value)) {
            callback();
          } else {
            callback("身份证号码格式不正确");
          }
        } else {
          callback("身份证号码格式不正确");
        }
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
      // showInterestRate(){
      //      this.$notification.open({
      //           message: '提醒',
      //           description: '无法获得利率信息',
      //       });
      // }
    }
    // mounted() {
    //     this.$axios({
    //         method: 'get',
    //         url: '/loan/interestRate',
    //     }).then(res => {
    //         let status = res.status;
    //         if (status == 200) {
    //             //  interestRate.updateTime=
    //             interestRate.one = periodOne;
    //             interestRate.three = periodTwo;
    //             interestRate.five = periodThree;
    //         } else {
    //             this.$notification.open({
    //                 message: '错误',
    //                 description: res.msg
    //             });
    //         }
    //     }).catch(err => {
    //         console.log('通信失败，请稍后再试');
    //         this.$notification.open({
    //             message: '错误',
    //             description: '无法获得利率信息',
    //         });
    //     })
    // }
  };
</script>