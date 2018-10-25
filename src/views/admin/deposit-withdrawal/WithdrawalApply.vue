n<template>
    <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}" style="margin-top:20px">
        <h2 style="margin-left:38%;margin-bottom:20px">办理取款</h2>
        <a-form-item label='取款人' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="name"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入取款人姓名' }]}">
            <a-input />
        </a-form-item>
        <a-form-item label='手机号' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="phone"
            :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入取款人手机号' },{validator: this.checkTelephone}
        ]
        }">
            <a-input />
        </a-form-item>
        <a-form-item label='账号' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="account"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入银行账号' }]}">
            <a-input />
        </a-form-item>
        <a-form-item label='取款金额' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="amount"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入需要取出的金额' }]}">
            <a-input />
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
        name: "WithdrawalApply",
        data() {
            return {
                password: undefined,
                formLayout: "horizontal",
                reviewerId:undefined
            };
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.radio = parseFloat(this.radio);
                        this.$axios({
                            method: 'post',
                            url: '/money/withdraw',
                            params: {
                                custName: values.name,
                                phone: values.phone,
                                account: values.account,
                                withdrawMoney: values.type,
                                password: values.password,
                                reviewerId:this.reviewerId
                            }
                        }).then(res => {
                            let result = res.data;
                            if (result.status == 200) {
                                this.$notification.open({
                                    message: "取款成功",
                                    description: '提交取款成功'
                                });
                                this.form.resetFields();
                            } else {
                                this.$notification.open({
                                    message: "提交取款失败",
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

                });
            },

            handleIdChange(value) {
                console.log(value);
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
            }
        },
        mounted() {
      this.reviewerId=this.$store.getters.user.userId;
            
        }
    };
</script>