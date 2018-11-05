<template>
<div>
  <a-table :columns="columns" :loading="loading" :dataSource="data" :scroll="{ x: 1500 }">
    <template slot="action" slot-scope="text, record">
         <a-button type='primary' @click="() => showDrawer(record.fundTxId)">显示详情</a-button>
    </template>

    <div slot="filterDropdown1" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
      <a-input
        ref="searchInput"
        placeholder='查询交易流水号'
        :value="selectedKeys[0]"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm)"
      />
      <a-button type='primary' @click="() => handleSearch(selectedKeys, confirm)">查询</a-button>
      <a-button type='danger' @click="() => handleReset(clearFilters)">重置</a-button>
    </div>

    <div slot="filterDropdown2" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
      <a-input
        ref="searchInput"
        placeholder='查询用户ID'
        :value="selectedKeys[0]"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm)"
      />
      <a-button type='primary' @click="() => handleSearch(selectedKeys, confirm)">查询</a-button>
      <a-button type='danger' @click="() => handleReset(clearFilters)">重置</a-button>
    </div>

    <div slot="filterDropdown3" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
      <a-input
        ref="searchInput"
        placeholder='查询账户号'
        :value="selectedKeys[0]"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm)"
      />
      <a-button type='primary' @click="() => handleSearch(selectedKeys, confirm)">查询</a-button>
      <a-button type='danger' @click="() => handleReset(clearFilters)">重置</a-button>
    </div>

    <div slot="filterDropdown4" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
      <a-input
        ref="searchInput"
        placeholder='查询基金代码'
        :value="selectedKeys[0]"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm)"
      />
      <a-button type='primary' @click="() => handleSearch(selectedKeys, confirm)">查询</a-button>
      <a-button type='danger' @click="() => handleReset(clearFilters)">重置</a-button>
    </div>

    <div slot="filterDropdown5" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
      <a-input
        ref="searchInput"
        placeholder='查询审核人ID'
        :value="selectedKeys[0]"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm)"
      />
      <a-button type='primary' @click="() => handleSearch(selectedKeys, confirm)">查询</a-button>
      <a-button type='danger' @click="() => handleReset(clearFilters)">重置</a-button>
    </div>

    <a-icon slot="filterIcon" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : '#aaa'}" />
    <template slot="customRender" slot-scope="text">
      <span v-if="searchText">
        <template v-for="(fragment, i) in (text+'').split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
          <span v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{fragment}}</span>
          <template v-else>{{fragment}}</template>
        </template>
      </span>
      <template v-else>{{text}}</template>
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
  { title: '交易流水号', width: 150, dataIndex: 'fundTxId', key: 'fundTxId', fixed: 'left',
    scopedSlots: {
      filterDropdown: 'filterDropdown1',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    onFilter: (value, record) => (record.fundTxId + "").includes(value),
    onFilterDropdownVisibleChange: (visible) => {
      if(visible) {
        setTimeout(() => {
          this.$refs.searchInput.focus()
        })
      }
    }
  },
  { title: '用户ID', width: 150, dataIndex: 'custId', key: 'custId', fixed: 'left',
    scopedSlots: {
      filterDropdown: 'filterDropdown2',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    onFilter: (value, record) => (record.custId + "").includes(value),
    onFilterDropdownVisibleChange: (visible) => {
      if(visible) {
        setTimeout(() => {
          this.$refs.searchInput.focus()
        })
      }
    }
  },
  { title: '账户号', dataIndex: 'account', key: 'account',
    scopedSlots: {
      filterDropdown: 'filterDropdown3',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    onFilter: (value, record) => (record.account + "").includes(value),
    onFilterDropdownVisibleChange: (visible) => {
      if(visible) {
        setTimeout(() => {
          this.$refs.searchInput.focus()
        })
      }
    }
  },
  { title: '基金代码', dataIndex: 'fundId', key: 'fundId',
    scopedSlots: {
      filterDropdown: 'filterDropdown4',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    onFilter: (value, record) => (record.fundId + "").includes(value),
    onFilterDropdownVisibleChange: (visible) => {
      if(visible) {
        setTimeout(() => {
          this.$refs.searchInput.focus()
        })
      }
    }
  },
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
  { title: '审核人ID', dataIndex: 'reviewId', key: 'reviewId',
    scopedSlots: {
      filterDropdown: 'filterDropdown5',
      filterIcon: 'filterIcon',
      customRender: 'customRender',
    },
    onFilter: (value, record) => (record.reviewId + "").includes(value),
    onFilterDropdownVisibleChange: (visible) => {
      if(visible) {
        setTimeout(() => {
          this.$refs.searchInput.focus()
        })
      }
    }
  },
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
      searchText: '',
      drawFundTxId: '',
      columns,
      }
  }, 
  mounted() {
		this.loading = true;
		this.$axios({
                    method: "get",
                    url: "/user/fund/query/tx"
                })
                .then(res => {
                    let result = res.data;
                    let status = result.status;
                    if (status == 200) {
                    	this.loading = false;
                    	for(let i=0; i<result.data.length; i++) {
                    		result.data[i].type = (result.data[i].type==0?"认购/申购":"赎回");
                        result.data[i].txDate = this.formatDate(result.data[i].txDate);
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
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
  	showDrawer(value) {
      this.visible = true;
      this.drawFundTxId = value;
      this.$axios({
                    method: "get",
                    url: "/query/txdetail/" + this.drawFundTxId
                })
                .then(res => {
                    let result = res.data;
                    let status = result.status;
                    let fundLogDetail = result.data.fundLogDetail;
                    if (status == 200) {
                      fundLogDetail.type = (fundLogDetail.type==0?"认购/申购":"赎回");
                      fundLogDetail.txDate = this.formatDate(fundLogDetail.txDate);
                      this.detailValue = fundLogDetail;   
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
    },
    formatDate(value) {
        let date = new Date(parseInt(value) / 1000);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
  }
}
</script>
<style scoped>
.custom-filter-dropdown {
  padding: 8px;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
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