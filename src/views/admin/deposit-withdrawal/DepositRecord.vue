<template>
    <div>
        <a-modal title="提示" :visible="Modelvisible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
            <p>请输入用户账户</p>
            <a-input v-model='account' />
        </a-modal>
        <a-table :dataSource="data" :columns="columns" :scroll="{ x: 1200}">
            <!-- <template slot="operation" slot-scope="text, record">
                <a-button type='primary' @click="() => showDrawer(record.transId)">显示详情</a-button>
            </template> -->
        </a-table>
    </div>
</template>

<script>
    export default {
        name: "DepositRecord",
        data() {
            return {
                formLayout: "horizontal",
                data: [],
                clickrow: 0,
                searchText: "",
                Modelvisible: false,
                confirmLoading: false,
                account:undefined,
                columns: [{
                        title: "存款流水号",
                        dataIndex: "depositId",
                        key: "depositId",
                        width: 120,
                        fixed: 'left'
                    },
                    {
                        title: "存款类型",
                        width: 80,
                        dataIndex: "depositType",
                        key: "depositType"
                    },
                    {
                        title: "存款金额",
                        width: 80,
                        dataIndex: "depositMoney",
                        key: "depositMoney"
                    },
                    {
                        title: "存款利率",
                        width: 80,
                        dataIndex: "depositRate",
                        key: "depositRate"
                    },
                    {
                        title: "存款日期",
                        width: 100,
                        dataIndex: "depositDate",
                        key: "depositDate"
                    }, {
                        title: "存款时长",
                        width: 80,
                        dataIndex: "depositDuration",
                        key: "depositDuration"
                    }, {
                        title: "转存方式",
                        width: 80,
                        dataIndex: "transferWay",
                        key: "transferWay"

                    }, {
                        title: "审核人id",
                        width: 80,
                        dataIndex: "reviewerId",
                        key: "reviewerId"
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
              this.Modelvisible=false;
            },
            handleOk() {
                this.confirmLoading = true;
                this.$axios({
                        method: 'get',
                        url: '/money/deposit/' + this.account
                    })
                    .then(res => {
                        let result = res.data;
                        let status = result.status;
                        if (status == 200) {
                            for(let i=0;i<result.data.length;i++){
                                result.data[i].depositDate=this.formatDate(result.data[i].depositDate);
                                result.data[i].depositRate=result.data[i].depositRate+'%';
                            }
                            this.data=result.data;
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
                    this.confirmLoading = false;
 this.Modelvisible=false;
            }
        },
        mounted() {
            this.Modelvisible=true;
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