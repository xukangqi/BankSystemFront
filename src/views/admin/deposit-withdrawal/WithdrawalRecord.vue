<template>
    <div>
        <a-modal title="提示" :visible="Modelvisible" @ok="handleOk" :confirmLoading="confirmLoading" @cancel="handleCancel">
            <p>请输入用户账户</p>
            <a-input v-model='account' />
        </a-modal>
        <a-table :dataSource="data" :columns="columns" :scroll="{ x: 1000}">
            <!-- <template slot="operation" slot-scope="text, record">
                <a-button type='primary' @click="() => showDrawer(record.transId)">显示详情</a-button>
            </template> -->
        </a-table>
    </div>
</template>

<script>
    export default {
        name: "WithdrawalRecord",
        data() {
            return {
                formLayout: "horizontal",
                data: [],
                clickrow: 0,
                searchText: "",
                Modelvisible: false,
                confirmLoading: false,
                account: undefined,
                columns: [{
                        title: "取款流水号",
                        dataIndex: "withdrawId",
                        key: "withdrawId",
                        width: 190,
                        fixed: 'left'
                    },
                    {
                        title: "取款金额",
                        width: 80,
                        dataIndex: "withdrawMoney",
                        key: "withdrawMoney"
                    },
                    {
                        title: "取款时间",
                        width: 100,
                        dataIndex: "withdrawDate",
                        key: "withdrawDate"
                    }, {
                        title: "到账时间",
                        width: 120,
                        dataIndex: "arriveTime",
                        key: "arriveTime"
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
                let date = new Date(parseInt(value) );
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            },
            formatDateTime(value) {
                let date = new Date(parseInt(value));
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            },
            handleReset(clearFilters) {
                clearFilters();
                this.searchText = "";
            },
            handleCancel() {
                this.Modelvisible = false;
            },
            handleOk() {
                this.confirmLoading = true;
                this.$axios({
                        method: 'get',
                        url: '/withdraw/' + this.account
                    })
                    .then(res => {
                        let result = res.data;
                        let status = result.status;
                        if (status == 200) {
                            for (let i = 0; i < result.data.length; i++) {
                                result.data[i].withdrawDate = this.formatDateTime(result.data[i].withdrawDate);
                                result.data[i].arriveTime = this.formatDateTime(result.data[i].arriveTime);
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
                this.confirmLoading = false;
                this.Modelvisible = false;
            }
        },
        mounted() {
            this.Modelvisible = true;
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