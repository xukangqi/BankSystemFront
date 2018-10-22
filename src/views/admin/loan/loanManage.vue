<template>
    <div>
        <a-table :dataSource="data" :columns="columns" :scroll="{ x: 1500}">
            <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
                <a-input ref="searchInput" placeholder='查找用户' :value="selectedKeys[0]" @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                    @pressEnter="() => handleSearch(selectedKeys, confirm)" />
                <a-button type='primary' @click="() => handleSearch(selectedKeys, confirm)">Search</a-button>
                <a-button @click="() => handleReset(clearFilters)">Reset</a-button>
            </div>

            <a-icon slot="filterIcon" slot-scope="filtered" type='smile-o' :style="{ color: filtered ? '#108ee9' : '#aaa' }" />
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
        <a-drawer title="Create" width=720 placement="right" :closable="false" @close="onClose" :visible="visible"
            style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px">
            <div>
                <a-collapse accordion>
                    <a-collapse-panel header="贷款详细信息" key="1">
                        <p>贷款交易流水号:{{this.detailValue.transId}}</p>
                        <p>贷款账户:{{this.detailValue.account}}</p>
                        <p>贷款日期:{{formatDate(this.detailValue.transDate)}}</p>
                        <p>贷款金额:{{this.detailValue.loanAmount}}</p>
                        <p>分期数目:{{this.detailValue.insCount}}</p>
                        <p>贷款利率:{{this.detailValue.loanInterest}}}</p>
                        <p>贷款总金额:{{this.detailValue.loanAmountSum}}</p>
                        <p>到期时间:{{formatDate(this.detailValue.expirationDate)}}</p>
                        <p>已收到还款:{{this.detailValue.recoveredAmount}}</p>
                        <p>贷款状态:{{formatLoanStatus(this.detailValue.loanStatus)}}</p>
                        <p>贷款类型:{{this.detailValue.loadTypeName}}</p>
                        <p>审核人信息:{{this.detailValue.reviewId}}</p>
                    </a-collapse-panel>
                    <a-collapse-panel header="还款记录" key="2" :disabled='false'>
                        <a-table :columns="paymentColumns" :dataSource="loanPayment">
                            <!-- <a slot="action" slot-scope="text" href="javascript:;">action</a> -->
                        </a-table>
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
                data: [],
                detailValue: {},
                loanPayment: [],
                visible: false,
                clickrow: 0,
                searchText: "",
                columns: [{
                        title: "交易流水号",
                        dataIndex: "transId",
                        key: "transId",
                        width: 100,
                        fixed: 'left'
                    },
                    {
                        title: "Name",
                        dataIndex: "name",
                        key: "name",
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
                        dataIndex: "loanDate",
                        key: "loanDate"
                    },
                    {
                        title: "贷款金额",
                        dataIndex: "loanAmount",
                        key: "loanAmount"
                    },
                    {
                        title: "贷款总金额",
                        dataIndex: "loanAmountSum",
                        key: "loanAmountSum"
                    },
                    {
                        title: "已收到金额",
                        dataIndex: "recoveredAmount",
                        key: "recoveredAmount"
                    },
                    {
                        title: "贷款状态",
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
                        width: 70,
                        fixed: 'right'
                    }
                ],
                paymentColumns: [{
                    title: "还贷交易流水号",
                    dataIndex: "paymentId",
                    key: "paymentId"
                }, {
                    title: "还贷批次",
                    dataIndex: "insNum",
                    key: "insNum"
                }, {
                    title: "本次还贷金额",
                    dataIndex: "paymentAmount",
                    key: "paymentAmount"
                }, {
                    title: "还贷时间",
                    dataIndex: "paymentDate",
                    key: "paymentDate"
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
                console.log(value);
                this.visible = true;
                this.$axios({
                        method: "get",
                        // url: "/loan/"+ value
                        url: '/loan'
                    })
                    .then(res => {
                        let result = res.data;
                        console.log(result.data);
                        let status = result.status;
                        if (status == 200) {
                            this.detailValue = result.data.loan;
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

                this.$axios({
                        method: "get",
                        // url: "/loan/payment"+ value
                        url: '/loan/payment'
                    })
                    .then(res => {
                        let result = res.data;
                        let status = result.status;
                        if (status == 200) {
                            let array=result.data.bankPayment;
                            for(let i=0;i<array.length;i++){
                                array[i].paymentDate = this.formatDate(array[i].paymentDate);
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
                        console.log("通信失败，请稍后再试");
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
                let date = new Date(parseInt(value) / 1000);
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
            }
        },
        mounted() {
            // console.log("开始通信");
            this.$axios({
                    method: "get",
                    url: "/loan/record"
                })
                .then(res => {
                    let result = res.data;
                    console.log(result.data);
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