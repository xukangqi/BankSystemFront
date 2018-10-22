<template>
<div>
  <a-table :columns="columns" :loading="loading" :dataSource="data" :scroll="{ x: 1500 }">
    <template slot="action" slot-scope="text, record">
         <a-button type='primary' @click="() => showDrawer(record.fundTxId)">显示详情</a-button>
    </template>
  </a-table>

  <a-drawer
      width=400
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px;"
    >
      <div style="background:#ECECEC; padding:30px;">
  		<a-card title="基金交易记录详情" :bordered="false" style="width: 300px" hoverable>
	    	<p>交易流水号：{{detailValue.fundTxId}}</p>
	    	<p>用户ID：{{detailValue.custId}}</p>
	    	<p>账户号：{{detailValue.account}}</p>
	    	<p>基金代码：{{detailValue.fundId}}</p>
	    	<p>交易类型：{{detailValue.type}}</p>
	    	<p>投资金额：{{detailValue.amount}}</p>
	    	<p>份额：{{detailValue.share}}</p>
	    	<p>交易时间：{{detailValue.txDate}}</p>
	    	<p>审核人ID：{{detailValue.reviewId}}</p>
  		</a-card>
	  </div>
      <div
        :style="{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e8e8e8',
          padding: '10px 16px',
          textAlign: 'right',
          left: 0,
          background: '#fff',
          borderRadius: '0 0 4px 4px',
        }"
      >
        <a-button
          @click="onClose"
        >
          关闭
        </a-button>
      </div>
    </a-drawer>
</div>
</template>
<script>
           
const columns = [
  { title: '交易流水号', width: 120, dataIndex: 'fundTxId', key: 'fundTxId', fixed: 'left' },
  { title: '用户ID', width: 100, dataIndex: 'custId', key: 'custId', fixed: 'left' },
  { title: '账户号', dataIndex: 'account', key: 'account' },
  { title: '基金代码', dataIndex: 'fundId', key: 'fundId' },
  { title: '交易类型', dataIndex: 'type', key: 'type', 
    filters: [{
        text: "认购/申购",
        value: "认购/申购"
        },
        {
          text: "赎回",
          value: "赎回"
        }
       ],
    onFilter: (value, record) => record.type == value
  },
  { title: '投资金额', dataIndex: 'amount', key: 'amount' },
  { title: '份额', dataIndex: 'share', key: 'share' },
  { title: '交易时间', dataIndex: 'txDate', key: 'txDate' },
  { title: '审核人ID', dataIndex: 'reviewId', key: 'reviewId' },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 150,
    scopedSlots: { customRender: 'action' },
  },
];


export default {
  data() {
    return {
      data: [],
      loading: false,
      detailValue:{},
      visible:false,
      columns,
      }
  }, 
  mounted() {
		this.loading = true;
		this.$axios({
                    method: "get",
                    url: "/investment/fundlog"
                })
                .then(res => {
                    let result = res.data;
                    let status = result.status;
                    if (status == 200) {
                    	this.loading = false;
                    	for(let i=0; i<result.data.length; i++) {
                    		result.data[i].type = (result.data[i].type==0?"认购/申购":"赎回");
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
  },
  methods: {
  	showDrawer(value) {
      this.visible = true;
      this.detailValue = this.showDetail(value);
    },
    onClose() {
      this.visible = false
    },
    showDetail(fundTxId){
    	let dataDetail = this.data;
    	let i;
    	for(i=0; i<dataDetail.length; i++) {
    		if(dataDetail[i].fundTxId == fundTxId) {
    			break;
    		}
    	}
    	return dataDetail[i];
    }
  }
}
</script>