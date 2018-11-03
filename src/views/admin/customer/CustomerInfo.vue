<template>
    <div>
        <a-table :dataSource="data" :columns="columns" :scroll="{ x: 1500}">
            <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
                <a-input ref="searchInput" placeholder='查找用户' :value="selectedKeys[0]" @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                    @pressEnter="() => handleSearch(selectedKeys, confirm)" />
                <a-button type='primary' @click="() => handleSearch(selectedKeys, confirm)">Search</a-button>
                <a-button @click="() => handleReset(clearFilters)">Reset</a-button>
            </div>
            <a-icon slot="filterIcon" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : '#aaa' }" />
            <template slot="customRender" slot-scope="text">
                <span v-if="searchText">
                    <template v-for="(fragment, i) in text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
                        <span v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{fragment}}</span>
                        <template v-else>{{fragment}}</template>
                    </template>
                </span>
                <template v-else>{{text}}</template>
            </template>

            <div slot="filterDropdown1" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
                <a-input ref="searchInput" placeholder='查找手机号' :value="selectedKeys[0]" @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                    @pressEnter="() => handleSearch(selectedKeys, confirm)" />
                <a-button type='primary' @click="() => handleSearch(selectedKeys, confirm)">Search</a-button>
                <a-button @click="() => handleReset(clearFilters)">Reset</a-button>
            </div>
            <a-icon slot="filterIcon1" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : '#aaa' }" />
            <template slot="customRender1" slot-scope="text">
                <span v-if="searchText">
                    <template v-for="(fragment, i) in text.split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
                        <span v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{fragment}}</span>
                        <template v-else>{{fragment}}</template>
                    </template>
                </span>
                <template v-else>{{text}}</template>
            </template>

            <template slot="operation" slot-scope="text, record">
                <a-button type='primary' @click="() => showDrawer(record.custId)">显示详情</a-button>
            </template>


        </a-table>

        <a-drawer title="详情" width=720 placement="right" :closable="false" @close="onClose" :visible="visible" style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
            <div>
                <a-collapse accordion>
                    <a-collapse-panel header="用户详细信息" key="1">
                        <p>用户ID:{{this.detailValue.custId}}</p>
                        <p>用户姓名:{{this.detailValue.custName}}</p>
                        <p>用户身份证:{{this.detailValue.identityCard}}</p>
                        <p>用户联系地址:{{this.detailValue.address}}</p>
                        <p>用户手机号:{{this.detailValue.phone}}</p>
                        <p>用户邮箱:{{this.detailValue.email}}</p>
                        <p>用户性别:{{formatSex(this.detailValue.sex)}}</p>
                        <p>用户类型:{{formatCustType(this.detailValue.custType)}}</p>
                        <p>用户信用:{{formatCredit(this.detailValue.credit)}}</p>
                    </a-collapse-panel>
                    <a-collapse-panel header="用户拥有账户" key="2" :disabled='false'>
                        <a-table :columns="accountColumns" :dataSource="accountData" :scroll="{ x: 900}">
                            <template slot="operation" slot-scope="text, record">
                                <a-button type='primary' @click="() => del(record.account)">销户</a-button>
                            </template>
                        </a-table>
                        <a-modal title="警告" :visible="Modelvisible" @ok="handleOk" :confirmLoading="confirmLoading"
                            @cancel="handleCancel">
                            <p>确认要对账号:{{this.delAccount}}销户吗？</p>
                        </a-modal>
                    </a-collapse-panel>
                    <a-collapse-panel header="修改用户信息" key="3" :disabled='false'>
                        <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}" style="margin-top:10px">
                            <a-form-item label='手机号' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }"
                                fieldDecoratorId="phone" :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入申请人手机号' },{validator: this.checkTelephone}
        ]
        }">
                                <a-input/>

                            </a-form-item>
                            <a-form-item label='邮箱' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="email"
                                :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入邮箱' },{validator:this.checkEmail}
        ]
        }">
                                <a-input />
                            </a-form-item>

                            <a-form-item label='所在地区' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }"
                                fieldDecoratorId="address" :fieldDecoratorOptions="{rules: [
           {required: true, message: '请选择所在地区' }]
        }">
                                <a-cascader :options="address" placeholder="请选择你所在的地址" />
                            </a-form-item>

                            <a-form-item label='详细地址' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }"
                                fieldDecoratorId="detailAddress" :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入详细地址' }]
        }">
                                <a-input />
                            </a-form-item>

                            <a-form-item label='账户密码' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }"
                                fieldDecoratorId="password" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账户密码' }]}">
                                <a-input type="password" v-model="password" />
                            </a-form-item>
                            <a-form-item label='重复账户密码' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }"
                                fieldDecoratorId="password2" :fieldDecoratorOptions="{rules: [{ required: true, message: '请再次输入账户密码'},{validator: this.checkPassword}]}">
                                <a-input type="password" />
                            </a-form-item>
                            <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
                                <a-button type='primary' htmlType='submit'>
                                    提交申请
                                </a-button>
                            </a-form-item>
                        </a-form>
                    </a-collapse-panel>

                </a-collapse>
            </div>
            <div :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }">
                <a-button :style="{
            marginRight: 8,
          }" @click="onClose">
                    关闭
                </a-button>
                <!-- <a-button @click="onClose" type="primary">Submit</a-button> -->
            </div>
        </a-drawer>
    </div>
</template>

<script>
    import addressdata from '../../../db/generateData.js'
    const {
        address
    } = addressdata
    export default {
        name: "CustomerInfo",
        data() {
            return {
                formLayout: "horizontal",
                data: [],
                clickrow: 0,
                searchText: "",
                //选中的用户id
                custId: 0,
                visible: false,
                Modelvisible: false,
                delAccount: 0,
                confirmLoading: false,
                //修改信息表单元素
                // formData:{},
                //用户详细信息
                detailValue: {},
                address,
                password:undefined,
                columns: [{
                        title: "客户ID",
                        dataIndex: "custId",
                        key: "custId",
                        width: 190,
                        fixed: 'left'
                    },
                    {
                        title: "用户姓名",
                        dataIndex: "custName",
                        key: "custName",
                        width: 90,
                        scopedSlots: {
                            filterDropdown: "filterDropdown",
                            filterIcon: "filterIcon",
                            customRender: "customRender"
                        },
                        onFilter: (value, record) =>
                            record.custName.includes(value),
                        onFilterDropdownVisibleChange: visible => {
                            if (visible) {
                                setTimeout(() => {
                                    this.$refs.searchInput.focus();
                                });
                            }
                        }
                    },
                    {
                        title: "身份证",
                        dataIndex: "identityCard",
                        key: "identityCard",
                        width: 120
                    },
                    {
                        title: "手机号",
                        dataIndex: "phone",
                        key: "phone",
                        width: 110,
                        scopedSlots: {
                            filterDropdown: "filterDropdown1",
                            filterIcon: "filterIcon1",
                            customRender: "customRender1"
                        },
                        onFilter: (value, record) => record.phone.includes(value),
                        onFilterDropdownVisibleChange: visible => {
                            if (visible) {
                                setTimeout(() => {
                                    this.$refs.searchInput.focus();
                                });
                            }
                        }

                    },
                    {
                        title: "客户信用",
                        dataIndex: "credit",
                        key: "credit",
                        width: 80
                    },
                    {
                        title: "客户类型",
                        dataIndex: "custType",
                        key: "custType",
                        width: 100,
                        filters: [{
                                text: "个人用户",
                                value: "个人用户"
                            },
                            {
                                text: "企业用户",
                                value: "企业用户"
                            }
                        ],
                        onFilter: (value, record) => record.custType == value
                    },
                    {
                        title: "操作",
                        dataIndex: "operation",
                        scopedSlots: {
                            customRender: "operation"
                        },
                        width: 50
                    }
                ],
                accountData: [],
                accountColumns: [{
                    title: "账户号",
                    dataIndex: "account",
                    key: "account",
                    fixed: 'left',
                    width: 180
                }, {
                    title: "余额",
                    dataIndex: "balances",
                    key: "balances"
                }, {
                    title: "不可用余额",
                    dataIndex: "blockedBalances",
                    key: "blockedBalances"
                }, {
                    title: "账户类型",
                    dataIndex: "accountType",
                    key: "accountType"
                }, {
                    title: "账户种类",
                    dataIndex: "accountKind",
                    key: "accountKind"
                }, {
                    title: "账户状态",
                    dataIndex: "accountStatus",
                    key: "accountStatus"
                }, {
                    title: "操作",
                    dataIndex: "operation",
                    scopedSlots: {
                        customRender: "operation"
                    }
                }]
            };
        },
        methods: {
            handleSearch(selectedKeys, confirm) {
                confirm();
                this.searchText = selectedKeys[0];
            },
            handleReset(clearFilters) {
                clearFilters();
                this.searchText = "";
            },
            showDrawer(value) {
                this.custId = value;
                console.log('custId  ' + this.custId);
                this.$axios({
                        method: "get",
                        url: "/customer/" + this.custId
                        // url: "/customer/123"
                    })
                    .then(res => {
                        let result = res.data;
                        let status = result.status;
                        if (status == 200) {
                            this.detailValue = result.data;
                            // this.formData=this.detailValue;
                            // console.log(this.formData);
                        } else {
                            this.$notification.open({
                                message: "错误",
                                description: result.msg
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        // console.log("通信失败，请稍后再试");
                        this.$notification.open({
                            message: "错误",
                            description: "服务器开小差了,请稍后再试"
                        });
                    });
                this.$axios({
                        method: "get",
                        url: "/customer/account/" + this.custId
                    })
                    .then(res => {
                        let result = res.data;
                        let status = result.status;
                        if (status == 200) {
                            let array = result.data;
                            for (let i = 0; i < array.length; i++) {
                                // array[i].accountType = this.for(array[i].paymentDate);
                                array[i].accountType = this.formatAccountType(array[i].accountType);
                                array[i].accountKind = this.formatAccountKind(array[i].accountKind);
                                array[i].accountStatus = this.formatAccountStatus(array[i].accountStatus);
                            }
                            this.accountData = array;
                        } else {
                            this.$notification.open({
                                message: "错误",
                                description: result.msg
                            });
                        }
                    })
                    .catch(err => {
                        // console.log("通信失败，请稍后再试");
                        console.log(err);
                        this.$notification.open({
                            message: "错误",
                            description: "服务器开小差了,请稍后再试"
                        });
                    });

                this.visible = true;


            },
            del(value) {
                this.delAccount = value;
                this.Modelvisible = true;
            },
            handleOk() {
                let flag = false;
                for (let i = 0; i < this.accountData.length; i++) {
                    if (this.accountData[i].account == this.delAccount) {
                        if (this.accountData[i].accountStatus == '销户') {
                            this.$notification.open({
                                message: "错误",
                                description: '账户已消除'
                            });
                            flag = true;
                            break;
                        }
                    }
                }
                if (!flag) {
                    this.$axios({
                            method: 'post',
                            url: '/customer/account/delete',
                            params: {
                                account: this.delAccount
                            }
                        })
                        .then(res => {
                            let result = res.data;
                            if (result.status == 200) {
                                for (let i = 0; i < this.accountData.length; i++) {
                                    if (this.accountData[i].account == this.delAccount) {
                                        this.accountData[i].accountStatus = '销户';
                                        break;
                                    }
                                }
                                this.confirmLoading = true;
                                setTimeout(() => {
                                    this.Modelvisible = false;
                                    this.confirmLoading = false;
                                }, 2000);

                            } else {
                                this.$notification.open({
                                    message: "错误",
                                    description: result.msg
                                });
                                this.Modelvisible = false;
                            }
                        })
                        .catch(err => {
                            this.$notification.open({
                                message: "错误",
                                description: "服务器开小差了,请稍后再试"
                            });
                            this.Modelvisible = false;
                        })
                } else {
                    setTimeout(() => {
                        this.Modelvisible = false;
                        this.confirmLoading = false;
                    }, 1000);
                }

                // this.delAccount = 0;
            },
            handleCancel() {
                this.Modelvisible = false;
            },
            onClose() {
                this.visible = false;
            },
            formatCredit(value) {
                let result = '';
                switch (parseInt(value)) {
                    case 1:
                        result = '优秀'
                        break;
                    case 2:
                        result = '良好';
                        break;
                    case 3:
                        result = '较差';
                        break;
                }
                return result;
            },
            formatCustType(value) {
                let result = '';
                switch (parseInt(value)) {
                    case 1:
                        result = '个人用户'
                        break;
                    case 2:
                        result = '企业用户';
                        break;
                }
                return result;
            },
            formatSex(value) {
                if (value == true) {
                    return '男'
                } else {
                    return '女'
                }
            },
            formatAccountType(value) {
                let result = '';
                switch (parseInt(value)) {
                    case 1:
                        result = '个人';
                        break;
                    case 2:
                        result = '企业';
                        break;
                }
                return result;
            },
            formatAccountKind(value) {
                let result = '';
                switch (parseInt(value)) {
                    case 1:
                        result = '一类';
                        break;
                    case 2:
                        result = '二类';
                        break;
                    case 3:
                        result = '三类';
                        break;
                }
                return result;
            },
            formatAccountStatus(value) {
                let result = '';
                switch (parseInt(value)) {
                    case 1:
                        result = '正常';
                        break;
                    case 2:
                        result = '冻结';
                        break;
                    case 3:
                        result = '销户';
                        break;
                }
                return result;
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
            },
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
                            url: '/customer/edit',
                            params: {
                                custId: this.custId,
                                phone: values.phone,
                                address: addr,
                                password: values.password,
                                email: values.email
                            }
                        }).then(res => {
                            let result = res.data;
                            if (result.status == 200) {
                                 this.$notification.open({
                                    message: "修改成功",
                                    description: '修改用户信息成功，即将跳转'
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
            }

        },
        mounted() {
            // console.log("开始通信");
            this.$axios({
                    method: "get",
                    url: "/customer/all"
                })
                .then(res => {
                    let result = res.data;
                    let status = result.status;
                    console.log(result);
                    if (status == 200) {
                        for (let i = 0; i < result.data.length; i++) {
                            result.data[i].custType = this.formatCustType(result.data[i].custType);
                            result.data[i].credit = this.formatCredit(result.data[i].credit);
                        }
                        this.data = result.data;
                    } else {
                        this.$notification.open({
                            message: "错误",
                            description: result.msg
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.$notification.open({
                        message: "错误",
                        description: "服务器开小差了,请稍后再试"
                    });
                });
        }
    };
</script>

<style scoped lang="scss">
    .custom-filter-dropdown {
        padding: 8px;
        border-radius: 6px;
        background: #fff;
        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    }

    .custom-filter-dropdown input {
        width: 130px;
        margin-right: 8px;
    }

    .custom-filter-dropdown button {
        margin-right: 8px;
    }

    .highlight {
        color: #f50;
    }
</style>