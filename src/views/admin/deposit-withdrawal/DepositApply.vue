n<template>
  <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}" style="margin-top:20px">
    <h2 style="margin-left:38%;margin-bottom:20px">办理存款</h2>

    <a-form-item label='账号' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="account"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入需要存入的银行账号' }]}">
      <a-input />
    </a-form-item>
    <a-form-item label='存款金额' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="amount"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入需要存入的金额' }]}">
      <a-input />
    </a-form-item>
    <a-form-item label='存款类别' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="type"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择存款类别' }]}">
      <a-select defaultValue='活期存款' @change="handleTypeChange">
        <a-select-option value='活期存款'>活期存款</a-select-option>
        <a-select-option value='整存整取'>整存整取</a-select-option>
        <a-select-option value='零存整取'>零存整取</a-select-option>
        <a-select-option value='整存领取'>整存领取</a-select-option>
        <a-select-option value='存本取息'>存本取息</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label='存款时长' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="duration"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择存款时长' }]}">
      <a-select defaultValue='活期'>
        <a-select-option value='活期'>活期</a-select-option>
        <a-select-option value='三个月'>三个月</a-select-option>
        <a-select-option value='半年'>半年</a-select-option>
        <a-select-option value='一年'>一年</a-select-option>
        <a-select-option value='二年'>二年</a-select-option>
        <a-select-option value='三年'>三年</a-select-option>
        <a-select-option value='五年'>五年</a-select-option>
      </a-select>
    </a-form-item>

    <a-form-item label='转存方式' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="transferWay"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请选择转存方式' }]}">
      <a-select defaultValue='自动转存'>
        <a-select-option value='自动转存'>自动转存</a-select-option>
        <a-select-option value='到期存活'>到期存活</a-select-option>

      </a-select>
    </a-form-item>

    <a-form-item label='存款利率' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="nouse">
      <a-popover title="规定存款利率">
        <template slot="content" v-for="item in nowRate">
          <p>{{item.name}}:{{item.interest}}%</p>
        </template>
        <a-input addonAfter="%" v-model="radio" />
      </a-popover>
    </a-form-item>
    <a-form-item label='账户密码' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="password"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账户密码' }]}">
      <a-input type="password" v-model="password" />
    </a-form-item>
    <a-form-item label='重复账户密码' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="password2"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请再次输入账户密码'},{validator: this.checkPassword}]}">
      <a-input type="password" />
    </a-form-item>
    <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
      <a-button type='primary' htmlType='submit'>
        提交
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
  export default {
    name: "DepositApply",
    data() {
      return {
        password: undefined,
        formLayout: "horizontal",
        interestRate: {},
        nowRate: [],
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
              this.radio = parseFloat(this.radio);
              this.$axios({
                method: 'post',
                url: '/money/deposit',
                params: {
                  account: values.account,
                  depositMoney: values.amount,
                  depositType: values.type,
                  depositDuration: values.duration,
                  transferWay: values.transferWay,
                  depositRate: this.radio,
                  password: values.password,
                  reviewerId: this.reviewerId
                }
              }).then(res => {
                let result = res.data;
                if (result.status == 200) {
                  this.$notification.open({
                    message: "存款成功",
                    description: '提交存款成功'
                  });
                  this.form.resetFields();
                } else {
                  this.$notification.open({
                    message: "提交存款失败",
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

      handleTypeChange(value) {
        if (value == '活期存款') {
          let interest = {
            name: '活期利率',
            interest: this.interestRate.currentRate
          }
          this.nowRate = [];
          this.nowRate.push(interest);

        } else if (value == '整存整取') {
          this.nowRate = [];
          let interest = {
            name: '三个月利率',
            interest: this.interestRate.zczqTmRate
          }
          this.nowRate.push(interest);
          interest = {
            name: '六个月利率',
            interest: this.interestRate.zczqHyRate
          }
          this.nowRate.push(interest);
          interest = {
            name: '一年利率',
            interest: this.interestRate.zczqOyRate
          }
          this.nowRate.push(interest);
          interest = {
            name: '两年利率',
            interest: this.interestRate.zczqTwyRate
          }
          this.nowRate.push(interest);
          interest = {
            name: '三年利率',
            interest: this.interestRate.zczqTyRate
          }
          this.nowRate.push(interest);
          interest = {
            name: '五年利率',
            interest: this.interestRate.zczqFyRate
          }
          this.nowRate.push(interest);
        } else {
          this.nowRate = [];
          let interest = {
            name: '一年利率',
            interest: this.interestRate.otherOyRate
          }
          this.nowRate.push(interest);
          interest = {
            name: '三年利率',
            interest: this.interestRate.otherTyRate
          }
          this.nowRate.push(interest);
          interest = {
            name: '五年利率',
            interest: this.interestRate.otherFyRate
          }
          this.nowRate.push(interest);
        }
      },
      handleIdChange(value) {
        console.log(value);
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
      }
    },
    mounted() {
      this.reviewerId=this.$store.getters.user.userId;
      this.$axios({
        url: '/money/interestrate',
        method: 'get'
      }).then(res => {
        let result = res.data;
        let status = result.status;
        if (status == 200) {
          this.interestRate = result.data;
          let interest = {
            name: '活期利率',
            interest: this.interestRate.currentRate
          }
          this.nowRate.push(interest);
        } else {
          this.$notification.open({
            message: "获取利率失败",
            description: result.msg
          });
        }
      }).catch(err => {
        console.log(err);
        this.$notification.open({
          message: "错误",
          description: "服务器开小差了,请稍后再试"
        });
      });
    }
  };
</script>