<template>
    <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}" style="margin-top:20px">
        <h2 style="margin-left:38%;margin-bottom:20px">开户申请</h2>
        <a-form-item label='姓名' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="custName"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入申请人姓名' }]}">
            <a-input />
        </a-form-item>
        <a-form-item label='身份证' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="identityCard"
            :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入申请人身份证号' },{validator: this.checkID}
        ]
        }">
            <a-input />
        </a-form-item>
        <a-form-item label='性别' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="sex"
            :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入你的性别' }
        ]
        }">
            <a-select defaultValue='true'>
                <a-select-option value='true'>男</a-select-option>
                <a-select-option value='false'>女</a-select-option>
            </a-select>
        </a-form-item>

        <a-form-item label='手机号' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="phone"
            :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入申请人手机号' },{validator: this.checkTelephone}
        ]
        }">
            <a-input />
        </a-form-item>
        <a-form-item label='邮箱' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="email"
            :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入邮箱' },{validator:this.checkEmail}
        ]
        }">
            <a-input />
        </a-form-item>
        <a-form-item label='所在地区' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="address"
            :fieldDecoratorOptions="{rules: [
           {required: true, message: '请选择所在地区' }]
        }">
            <a-cascader :options="address" placeholder="请选择你所在的地址" />
        </a-form-item>
        <a-form-item label='详细地址' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="detailAddress"
            :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入详细地址' }]
        }">
            <a-input />
        </a-form-item>
        <a-form-item label='类型' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="custType"
            :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入你的类型' }
        ]
        }">
            <a-select defaultValue='1'>
                <a-select-option value='1'>个人用户</a-select-option>
                <a-select-option value='2'>企业用户</a-select-option>
            </a-select>
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
                提交申请
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
    import addressdata from '../../../db/generateData.js'
    const {
        address
    } = addressdata
    export default {
        name: "NewConsumer",
        data() {
            return {
                password: undefined,
                address,
                formLayout: "horizontal"
            };
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        let addr = '';
                        for (let i = 0; i < values.address.length; i++) {
                            addr += values.address[i];
                        }
                        addr += values.detailAddress;
                        this.$axios({
                            method: 'post',
                            url: '/customer/new',
                            params: {
                                custName: values.custName,
                                identityCard: values.identityCard,
                                telephone: values.telephone,
                                address: addr,
                                password: values.password,
                                email: values.email,
                                sex:values.sex,
                                custType:values.custType
                            }
                        }).then(res => {
                            let result = res.data;
                            if (result.status == 200) {
                                custId=result.data;
                                this.$notification.open({
                                    message: "开户成功",
                                    description: '用户ID为'+custId
                                });
                                this.$router.push('/admin/customer/info');
                            } else {
                                this.$notification.open({
                                    message: "提交请求失败",
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
                })
            },
            checkID(rule, value, callback) {
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
            //  this.address = require('../../../db/generateData.json');
        }
    };
</script>