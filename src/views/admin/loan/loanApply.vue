<template>
  <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}" style="margin-top:20px">
    <h2 style="margin-left:38%;margin-bottom:20px">贷款申请</h2>
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
    <a-form-item label='手机号' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="phone"
      :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入申请人手机号' },{validator: this.checkTelephone}
        ]
        }">
      <a-input />
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
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入贷款期限' }]}">
      <a-input addonAfter="月"/>
    </a-form-item>
    <a-form-item label='贷款类型' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="loanType"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入贷款类型' }]}">
      <a-select defaultValue='1' @change="handleInterestRateChange">
        <a-select-option value='1'>住房贷款</a-select-option>
        <a-select-option value='2'>小微贷款</a-select-option>
        <a-select-option value='3'>消费贷款</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label='贷款利率' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="nouse">
      <a-popover title="规定贷款利率">
        <template slot="content">
          <p>一年期以上:{{interestRate.one}}%</p>
          <p>三年期以上:{{interestRate.three}}%</p>
          <p>五年期以上:{{interestRate.five}}%</p>
          <p>违约利率:{{interestRate.fineRate}}%</p>
        </template>
        <a-input addonAfter="%" v-model="radio" />
      </a-popover>
    </a-form-item>
    <a-form-item label='还款账户密码' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="password"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账户密码' }]}">
      <a-input type="password" v-model="password" />
    </a-form-item>
    <a-form-item label='重复还款账户密码' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="password2"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请再次输入账户密码'},{validator: this.checkPassword}]}">
      <a-input type="password" />
    </a-form-item>
    <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
      <a-button type='primary' htmlType='submit'>
        提交申请
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  export default {
    name: "LoadApply",
    data() {
      return {
        password: undefined,
        formLayout: "horizontal",
        interestRate: {
          // updateTime:'',
          one: 0,
          three: 0,
          five: 0,
          fineRate: 0
        },
        radio: undefined,
        reviewerId: undefined
      };
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            if (this.radio == 0) {
              this.$notification.open({
                message: '错误',
                description: '请输入利率信息',
              });
            } else {
              console.log('开始提交');
              this.radio = parseFloat(this.radio);
              this.$axios({
                method: 'post',
                url: '/loan/apply',
                params: {
                  name: values.name,
                  IdCard: values.id,
                  phone: values.phone,
                  account: values.account,
                  amount: values.amount,
                  time: values.time,
                  interestRate: this.radio,
                  password: values.password,
                  loanType: values.loanType,
                  reviewerId: this.reviewerId
                }
              }).then(res => {
                let result = res.data;
                console.log(result);
                if (result.status == 200) {
                  this.$notification.open({
                    message: "申请成功",
                    description: '提交申请成功'
                  });
                  this.$router.push('/admin/loan/manage');
                } else {
                  this.$notification.open({
                    message: "提交申请失败",
                    description: result.msg
                  });
                }

              }).catch(err => {
                this.$notification.open({
                  message: "错误",
                  description: "服务器开小差了,请稍后再试"
                });
              })
            }
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
        console.log(value);
        if (typeof (value) === 'undefined') {
          callback('请输入申请人身份证号');
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
        if (typeof (value) == undefined) {
          callback();
        }
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback("手机号码错误");
        } else {
          callback();
        }
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
      handleInterestRateChange(value) {
        this.$axios({
          method: 'get',
          url: '/loan/interestRate/' + value,
        }).then(res => {
          let result = res.data;
          let status = result.status;
          if (status == 200) {
            this.interestRate.one = result.data.periodOne;
            this.interestRate.three = result.data.periodTwo;
            this.interestRate.five = result.data.periodThree;
            this.interestRate.fineRate = result.data.fineRate;
          } else {
            this.$notification.open({
              message: '错误',
              description: result.msg
            });
          }
        }).catch(err => {
          console.log('通信失败，请稍后再试');
          this.$notification.open({
            message: '错误',
            description: '无法获得利率信息',
          });
        })
      }
    },
    mounted() {
      this.reviewerId = this.$store.getters.user.userId;
      this.$axios({
        method: 'get',
        url: '/loan/interestRate/1',
      }).then(res => {
        let result = res.data;
        console.log(result);
        let status = result.status;
        if (status == 200) {
          this.interestRate.one = result.data.periodOne;
          this.interestRate.three = result.data.periodTwo;
          this.interestRate.five = result.data.periodThree;
          this.interestRate.fineRate = result.data.fineRate;
        } else {
          this.$notification.open({
            message: '错误',
            description: result.msg
          });
        }
      }).catch(err => {
        console.log(err);
        this.$notification.open({
          message: '错误',
          description: '无法获得利率信息',
        });
      })
    }
  };
</script>