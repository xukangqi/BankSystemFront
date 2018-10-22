<template>
    <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}" style="margin-top:20px">
        <h2 style="margin-left:38%;margin-bottom:20px">新增账户申请</h2>
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
        <a-form-item label='手机号' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="phone"
            :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入申请人手机号' },{validator: this.checkTelephone}
        ]
        }">
            <a-input />
        </a-form-item>
       
        <a-form-item label='开户银行所在地区' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="address"
            :fieldDecoratorOptions="{rules: [
           {required: true, message: '请选择所在地区' }]
        }">
            <a-cascader :options="address" placeholder="请选择所在地区" />
        </a-form-item>
        <a-form-item label='开户网点' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="detailAddress"
            :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入开户网点' }]
        }">
            <a-input />
        </a-form-item>
        <a-form-item label='账户类型' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="accountType"
            :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入账户类型' }
        ]
        }">
            <a-select defaultValue='1'>
                <a-select-option value='1'>个人</a-select-option>
                <a-select-option value='2'>企业</a-select-option>
            </a-select>
        </a-form-item>
         <a-form-item label='账户种类' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="accountKind"
            :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入账户种类' }
        ]
        }">
            <a-select defaultValue='1'>
                <a-select-option value='1'>一类</a-select-option>
                <a-select-option value='2'>二类</a-select-option>
                <a-select-option value='3'>三类</a-select-option>
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
        name: "NewAccount",
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
                        console.log()
                        this.$axios({
                            method: 'post',
                            url: '/customer/account/new',
                            params: {
                                custName: values.custName,
                                identityCard: values.identityCard,
                                phone: values.phone,
                                depositBank: addr,
                                accountKind:values.accountKind,
                                accountType:values.accountType
                            }
                        }).then(res => {
                            let result = res.data;
                            if (result.status == 200) {
                                custId=result.data;
                                this.$notification.open({
                                    message: "新增账户成功",
                                    description: '账户号为'+account
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
            }
        },
        mounted() {
            //  this.address = require('../../../db/generateData.json');
        }
    };
</script>