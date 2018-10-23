<template>
    <div>
        <a-modal title="Title" :visible="Modelvisible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
            <p>请输入用户账户</p>
            <a-input :value='this.account' />
        </a-modal>
        <a-table :dataSource="data" :columns="columns" :scroll="{ x: 1500}">
            <template slot="operation" slot-scope="text, record">
                <a-button type='primary' @click="() => showDrawer(record.transId)">显示详情</a-button>
            </template>
        </a-table>
    </div>
</template>

<script>
    export default {
        name: "Deposit",
        data() {
            return {
                formLayout: "horizontal",
                data: [],
                clickrow: 0,
                searchText: "",
                Modelvisible: false,
                confirmLoading: true,
                account: 0,
                columns: [{
                        title: "交易流水号",
                        dataIndex: " depositId",
                        key: "depositId",
                        width: 120,
                        fixed: 'left'
                    },
                    {
                        title: "贷款日期",
                        width: 120,
                        dataIndex: "loanDate",
                        key: "loanDate"
                    },
                    {
                        title: "贷款金额",
                        width: 140,
                        dataIndex: "loanAmount",
                        key: "loanAmount"
                    },
                    {
                        title: "贷款总金额",
                        width: 140,
                        dataIndex: "loanAmountSum",
                        key: "loanAmountSum"
                    },
                    {
                        title: "已收到金额",
                        width: 140,
                        dataIndex: "recoveredAmount",
                        key: "recoveredAmount"
                    },
                    {
                        title: "贷款状态",
                        width: 100,
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
                                value: '逾期'
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
                ]
            };
        },
        methods: {
            handleSearch(selectedKeys, confirm) {
                confirm();
                this.searchText = selectedKeys[0];
            },
            formatDate(value) {
                let date = new Date(parseInt(value) / 1000);
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            },
            handleReset(clearFilters) {
                clearFilters();
                this.searchText = "";
            },
            handleCancel() {

            },
            handelOk() {
                this.confirmLoading = true;
                this.$axios({
                        method: 'get',
                        url: ''
                    })
                    .then({

                    })
                    .catch({

                    });

            }
        },
        mounted() {
            // console.log("开始通信");
            this.$axios({
                    method: "get",
                    url: " /money/withdraw/" + this.account
                })
                .then(res => {
                    let result = res.data;
                    let status = result.status;
                    if (status == 200) {
                        for (let i = 0; i < result.data.length; i++) {

                            result.data[i].loanDate = this.formatDate(result.data[i].loanDate);
                            result.data[i].loanStatus = this.formatLoanStatus(parseInt(result.data[i].loanStatus));

                            // result.data[i].operation = '<a-button type="primary">查看详情</a-button>'
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
                    console.log("通信失败，请稍后再试");
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