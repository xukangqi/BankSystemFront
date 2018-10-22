<template>
<div>
  <a-table :dataSource="data" :columns="columns" :loading="loading">
    <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
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
    <a-icon slot="filterIcon" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : '#aaa' }" />

    <template slot="operation" slot-scope="text, record">
                <a-button type='primary' @click="() => showDrawer(record.fundId)">显示详情</a-button>
            </template>

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
  		<a-card title="基金产品详情" :bordered="false" style="width: 300px" hoverable>
	    	<p>基金代码：{{detailValue.fundId}}</p>
	    	<p>交易类型：{{detailValue.type}}</p>
	    	<p>申购费率：{{detailValue.purchaseRate}}%</p>
	    	<p>基金单位净值：{{detailValue.netAssetValue}}</p>
	    	<p>赎回费率：{{detailValue.redemptionRate}}%</p>
	    	<p>记录时间：{{detailValue.recordDate}}</p>
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

export default {
	mounted() {
		this.loading = true;
		this.$axios({
                    method: "get",
                    url: "/investment/fundproduct"
                })
                .then(res => {
                    let result = res.data;
                    let status = result.status;
                    if (status == 200) {
                    	this.loading = false;
                    	for(let i=0; i<result.data.length; i++) {
                    		result.data[i].type = (result.data[i].type==0?"认购/申购":"赎回");
                    		result.data[i].purchaseRate = result.data[i].purchaseRate.toFixed(2);
                    		result.data[i].netAssetValue = result.data[i].netAssetValue.toFixed(4);
                    		result.data[i].redemptionRate = result.data[i].redemptionRate.toFixed(2);
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
  data () {
    return {
      data:[],
      loading:false,
      visible: false,
      searchText: '',
      detailValue: {},
      columns: [
      	{
        title: '基金代码',
		dataIndex: 'fundId',
		key:'fundId',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => (record.fundId + "").includes(value),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.$refs.searchInput.focus()
            })
          }
        },
      },
      {
        title: '交易类型',
        dataIndex: 'type',
        key: 'type',
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
      }, {
		  title: '申购费率',
		  dataIndex: 'purchaseRate',
		}, {
		  title: ' 基金单位净值',
		  dataIndex: 'netAssetValue',
		}, {
		  title: '赎回费率',
		  dataIndex: 'redemptionRate',
		}, {
		  title: '记录时间',
		  dataIndex: 'recordDate',
		}, {
			title: '操作',
			dataIndex: 'operation',
			scopedSlots: {
				customRender: 'operation'
			}
		}],    
	}
  },
  methods: {
    handleSearch (selectedKeys, confirm) {
      confirm()
      this.searchText = selectedKeys[0]
      console.log(this.searchText)
    },

    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    },
    showDrawer(value) {
      this.visible = true;
      this.detailValue = this.showDetail(value);
    },
    onClose() {
      this.visible = false
    },
    showDetail(fundId){
    	let dataDetail = this.data;
    	let i;
    	for(i=0; i<dataDetail.length; i++) {
    		if(dataDetail[i].fundId == fundId) {
    			break;
    		}
    	}
    	return dataDetail[i];
    }
  },
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