<template>
    <div>
        <a-table :dataSource="data" :columns="columns" :scroll="{ x: 1500}">
            <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
                <a-input ref="searchInput" placeholder='查找贷款账号' :value="selectedKeys[0]" @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
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
            <template slot="operation" slot-scope="text, record">
                <a-button type='primary' @click="() => showDrawer(record.transId)">显示详情</a-button>
            </template>
        </a-table>
        <a-drawer title="贷款详情" width=720 placement="right" :closable="false" @close="onClose" :visible="visible"
            style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
            <div>
                <a-collapse accordion>
                    <a-collapse-panel header="贷款详细信息" key="1">
                        <p>贷款交易流水号:{{this.detailValue.transId}}</p>
                        <p>贷款账户:{{this.detailValue.account}}</p>
                        <p>贷款日期:{{formatDate(this.detailValue.transDate)}}</p>
                        <p>贷款金额:{{this.detailValue.loanAmount}}</p>
                        <p>分期数目:{{this.detailValue.insCount}}个月</p>
                        <p>贷款利率:{{this.detailValue.loanInterest}}</p>
                        <p>贷款总金额:{{this.detailValue.loanAmountSum}}</p>
                        <p>到期时间:{{formatDate(this.detailValue.expirationDate)}}</p>
                        <p>已收到还款:{{this.detailValue.recoveredAmount}}</p>
                        <p>贷款状态:{{this.detailValue.loanStatus}}</p>
                        <p>贷款类型:{{this.detailValue.loanTypeName}}</p>
                        <p>审核人信息:{{this.detailValue.reviewerId}}</p>
                    </a-collapse-panel>
                     <a-collapse-panel header="分期详情" key="2" :disabled='false'>
                        <a-table :columns="paymentColumns" :dataSource="loanPayment">
                            <!-- <a slot="action" slot-scope="text" href="javascript:;">action</a> -->
                        </a-table>
                    </a-collapse-panel>
                    <a-collapse-panel header="还款记录" key="3" :disabled='false'>
                        <a-table :columns="paylogColumns" :dataSource="loanPaylog">
                            <!-- <a slot="action" slot-scope="text" href="javascript:;">action</a> -->
                        </a-table>
                    </a-collapse-panel>
                    <a-collapse-panel header="还款申请" key="4" :disabled='false'>
                        <a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}" style="margin-top:20px">
                            <a-form-item label='申请人' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }"
                                fieldDecoratorId="name" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入姓名' }]}">
                                <a-input />
                            </a-form-item>
                            <a-form-item label='身份证' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }"
                                fieldDecoratorId="id" :fieldDecoratorOptions="{rules: [
                                  {required: true, message: '请输入身份证号' },{validator: this.checkID}
                                       ]
                                      }">
                                <a-input />
                            </a-form-item>
                            <a-form-item label='手机号' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }"
                                fieldDecoratorId="telephone" :fieldDecoratorOptions="{rules: [
           {required: true, message: '请输入手机号' },{validator: this.checkTelephone}
        ]
        }">
                                <a-input />
                            </a-form-item>
                            <a-form-item label='账号' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="account"
                                :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入需要还款的银行账号' }]}">
                                <a-input />
                            </a-form-item>
                            <a-form-item label='还款金额' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }"
                                fieldDecoratorId="amount" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入还款金额' }]}">
                                <a-input />
                            </a-form-item>
                            
                             <a-form-item label='还款账户密码' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }"
                                fieldDecoratorId="password" :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入还款账户密码' }]}">
                                <a-input type="password" v-model="password"/>
                            </a-form-item>
                             <a-form-item label='重复还款账户密码' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }"
                                fieldDecoratorId="password2" :fieldDecoratorOptions="{rules: [{ required: true, message: '请再次输入还款账户密码'},{validator: this.checkPassword}]}">
                                <a-input  type="password"/>
                            </a-form-item>
                            <a-form-item :wrapperCol="{ span: 12, offset: 5 }">
                                <a-button type='primary' htmlType='submit'>
                                    提交还款
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
    export default {
        name: "LoanManage",
        data() {
            return {
                formLayout: "horizontal",
                data: [],
                password:undefined,
                DrawTransId:undefined,
                detailValue: {},
                loanPaylog: [],
                loanPayment: [],
                visible: false,
                clickrow: 0,
                searchText: "",
                columns: [{
                        title: "交易流水号",
                        dataIndex: "transId",
                        key: "transId",
                        width: 200,
                        fixed: 'left'
                    },
                    {
                        title: "贷款账号",
                        dataIndex: "account",
                        width: 140,
                        key: "account",
                        scopedSlots: {
                            filterDropdown: "filterDropdown",
                            filterIcon: "filterIcon",
                            customRender: "customRender"
                        },
                        onFilter: (value, record) =>
                            record.name.toLowerCase().includes(value.toLowerCase()),
                        onFilterDropdownVisibleChange: visible => {
                            if (visible) {
                                setTimeout(() => {
                                    this.$refs.searchInput.focus();
                                });
                            }
                        }
                    },
                    {
                        title: "贷款日期",
                        width: 120,
                        dataIndex: "transDate",
                        key: "transDate"
                    },
                    {
                        title: "贷款金额",
                        width: 100,
                        dataIndex: "loanAmount",
                        key: "loanAmount"
                    },
                    {
                        title: "贷款总金额",
                        width: 100,
                        dataIndex: "loanAmountSum",
                        key: "loanAmountSum"
                    },
                    {
                        title: "已收到金额",
                        width: 80,
                        dataIndex: "recoveredAmount",
                        key: "recoveredAmount"
                    },
                    {
                        title: "贷款状态",
                        width: 70,
                        dataIndex: "loanStatus",
                        key: "loanStatus",
                        filters: [{
                                text: "未到期",
                                value: "未到期"
                            },
                            {
                                text: "已还清",
                                value: "已还清"
                            },
                            {
                                text: "逾期",
                                value: "逾期"
                            }
                        ],
                        onFilter: (value, record) => record.loanStatus == value
                    },
                    {
                        title: "操作",
                        dataIndex: "operation",
                        scopedSlots: {
                            customRender: "operation"
                        },
                        width: 70
                    }
                ],
                paylogColumns: [{
                    title: "还款交易流水号",
                    dataIndex: "paylogId",
                    key: "paylogId"
                }, {
                    title: "还款账户",
                    dataIndex: "account",
                    key: "account"
                }, {
                    title: "本次还款金额",
                    dataIndex: "payAmount",
                    key: "payAmount"
                }, {
                    title: "还款时间",
                    dataIndex: "payDate",
                    key: "payDate"
                }],
                 paymentColumns: [ {
                    title: "分期期数",
                    dataIndex: "insNum",
                    key: "insNum"
                },{
                    title: "分期金额",
                    dataIndex: "paymentAmount",
                    key: "paymentAmount"
                },{
                title: "已还金额",
                    dataIndex: "reimbursement",
                    key: "reimbursement"
                },{
                    title: "需还总金额",
                    dataIndex: "allPaymentAmount",
                    key: "allPaymentAmount"
                },{
                    title: "到期时间",
                    dataIndex: "paymentDate",
                    key: "paymentDate"
                },{
                    title: "当前状态",
                    dataIndex: "isFinished",
                    key: "isFinished"

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
            formatPaymentStatus(value){
                let result='';
                if(value==true){
                   result='已还清';
                }else{
                   result='未还清';
                }
                 return result;
            },
            showDrawer(value) {
                this.DrawTransId=value;
                this.visible = true;
                this.$axios({
                        method: "get",
                        url: "/loan/"+ this.DrawTransId
                        // url: '/loan'
                    })
                    .then(res => {
                        let result = res.data;
                        let status = result.status;
                        if (status == 200) {
                            this.detailValue = result.data;
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

                this.$axios({
                        method: "get",
                        url: "/loan/paylog/"+ this.DrawTransId
                    })
                    .then(res => {
                        let result = res.data;
                        let status = result.status;
                        if (status == 200) {
                            let array = result.data;
                            for (let i = 0; i < array.length; i++) {
                                array[i].payDate = this.formatDate(array[i].payDate);
                            }
                            this.loanPaylog = array;
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

                     this.$axios({
                        method: "get",
                        url: "/loan/payment/"+ this.DrawTransId
                    })
                    .then(res => {
                        let result = res.data;
                        let status = result.status;
                        if (status == 200) {
                            let array = result.data;
                            for (let i = 0; i < array.length; i++) {
                                array[i].paymentDate = this.formatDate(array[i].paymentDate);
                                array[i].isFinished=this.formatPaymentStatus(array[i].isFinished);
                            }
                            this.loanPayment = array;
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
            },
            onClose() {
                this.visible = false;
            },
            formatDate(value) {
                let date = new Date(parseInt(value));
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            },
            formatLoanStatus(value) {
                let status = "";
                switch (value) {
                    case 1:
                        status = "未到期";
                        break;
                    case 2:
                        status = "已还清";
                        break;
                    case 3:
                        status == "逾期";
                        break;
                }
                return status;
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
            checkPassword(rule, value, callback){
 
               if (typeof (value) == undefined) {
                    callback('请再次输入密码');
                }else{
                    if(value===this.password){
                        callback();
                    }else{
                        callback('密码不一致');
                    }
                }

            },
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.$axios({
                            method: 'post',
                            url: '/loan/payment',
                            params: {
                                name: values.name,
                                IdCard: values.id,
                                telephone: values.telephone,
                                account: values.account,
                                amount: values.amount,
                                transId:this.DrawTransId,
                                password:values.password
                            }
                        }).then(res => {
                            let result = res.data;
                            if (result.status == 200) {
                                this.$notification.open({
                                    message: "申请成功",
                                    description: '提交申请成功'
                                });
                                // this.$router.push('/admin/loan/manage');
                                this.form.resetFields();
                                setTimeout(()=>{
                                this.visible=false;
                                },500);
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
                });
            }
        },
        mounted() {
            // console.log("开始通信");
            this.$axios({
                    method: "get",
                    url: "/loan/allRecord"
                })
                .then(res => {
                    let result = res.data;
                    let status = result.status;
                    if (status == 200) {
                        for (let i = 0; i < result.data.length; i++) {
                            result.data[i].transDate = this.formatDate(result.data[i].transDate);
                            // result.data[i].loanStatus = this.formatLoanStatus(parseInt(result.data[i].loanStatus));
                            
                            // result.data[i].transId=result.data[i].transId.toString();
                        }
                        this.data = result.data;
                        // console.log(result.data);
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