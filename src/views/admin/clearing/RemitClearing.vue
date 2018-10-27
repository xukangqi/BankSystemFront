<template>
  <a-table :dataSource="data" :columns="columns" :loading="loading">
    <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
      <a-input
        ref="searchInput"
        placeholder='查询付款账户'
        :value="selectedKeys[0]"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm)"
      />
      <a-button type='primary' @click="() => handleSearch(selectedKeys, confirm)">查询</a-button>
      <a-button type='danger' @click="() => handleReset(clearFilters)">重置</a-button>
    </div>

    <div slot="filterDropdown1" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
      <a-input
        ref="searchInput"
        placeholder='查询收款账户'
        :value="selectedKeys[0]"
        @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
        @pressEnter="() => handleSearch(selectedKeys, confirm)"
      />
      <a-button type='primary' @click="() => handleSearch(selectedKeys, confirm)">查询</a-button>
      <a-button type='danger' @click="() => handleReset(clearFilters)">重置</a-button>
    </div>

    <a-icon slot="filterIcon" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : '#aaa' }" />
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
</template>

<script>

export default {
	mounted() {
		this.loading = true;
		this.$axios({
                    method: "get",
                    url: "/clearing/remitlog"
                })
                .then(res => {
                    let result = res.data;
                    let status = result.status;
                    if (status == 200) {
                    	this.loading = false;
                      for(let i=0; i<result.data.length; i++) {
                        result.data[i].remitGenerateDate = this.formatDate(result.data[i].remitGenerateDate);
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
      searchText: '',
      columns: [{
    		  title: '交易流水号',
    		  dataIndex: 'remitId',
    		  key:'remitId'
		    },
      	{
        title: '付款账户号',
        dataIndex: 'remitOutAccount',
        key: 'remitOutAccount',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => (record.remitOutAccount + "").includes(value),
        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => {
              this.$refs.searchInput.focus()
            })
          }
        },
      },
      {
        title: '收款账户号',
        dataIndex: 'remitInAccount',
        key: 'remitInAccount',
        scopedSlots: {
          filterDropdown: 'filterDropdown1',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilter: (value, record) => (record.remitInAccount + "").includes(value),
        onFilterDropdownVisibleChange: (visible) => {
          if(visible) {
            setTimeout(() => {
              this.$refs.searchInput.focus()
            })
        }
    }
      }, {
		  title: '转账金额',
		  dataIndex: 'amount',
		}, {
		  title: '汇票生成时间',
		  dataIndex: 'remitGenerateDate',
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
    formatDate(value) {
                let date = new Date(parseInt(value) / 1000);
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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