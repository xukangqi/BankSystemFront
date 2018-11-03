<template>
<div>
  <a-table :columns="columns" :loading="loading" :dataSource="data" :scroll="{ x: 1000 }">
  	<div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
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

    <div slot="filterDropdown1" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
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
    <a-icon slot="filterIcon1" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : '#aaa'}" />
    <template slot="customRender1" slot-scope="text">
      <span v-if="searchText">
        <template v-for="(fragment, i) in (text+'').split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
          <span v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{fragment}}</span>
          <template v-else>{{fragment}}</template>
        </template>
      </span>
      <template v-else>{{text}}</template>
    </template>

    <div slot="filterDropdown2" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters }" class='custom-filter-dropdown'>
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
    <a-icon slot="filterIcon2" slot-scope="filtered" type='search' :style="{ color: filtered ? '#108ee9' : '#aaa'}" />
    <template slot="customRender2" slot-scope="text">
      <span v-if="searchText">
        <template v-for="(fragment, i) in (text+'').split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))">
          <span v-if="fragment.toLowerCase() === searchText.toLowerCase()" :key="i" class="highlight">{{fragment}}</span>
          <template v-else>{{fragment}}</template>
        </template>
      </span>
      <template v-else>{{text}}</template>
    </template>

  </a-table>
</div>
</template>
<script>
           
const columns = [
  { title: '用户ID', dataIndex: 'custId', key: 'custId', fixed: 'left',
    scopedSlots: {
    	filterDropdown: 'filterDropdown',
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
  { title: '账户号', dataIndex: 'account', key: 'account', scopedSlots: {
      filterDropdown: 'filterDropdown1',
      filterIcon: 'filterIcon1',
      customRender: 'customRender1',
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
      filterDropdown: 'filterDropdown2',
      filterIcon: 'filterIcon2',
      customRender: 'customRender2',
    },
    onFilter: (value, record) => (record.fundId + "").includes(value),
    onFilterDropdownVisibleChange: (visible) => {
      if(visible) {
        setTimeout(() => {
          this.$refs.searchInput.focus()
        })
      }
    } 
  },{
      title: ' 基金单位净值',
      dataIndex: 'netAssetValue',
  },
  { title: '份额', dataIndex: 'share', key: 'share', fixed:'right', width:150,
    sorter: (a, b) => a.share - b.share
  }
];


export default {
  data() { 
    return {
      data: [],
      loading: false,
      detailValue:{},
      searchText: '',
      visible:false,
      columns,
      }
  },
  mounted() {
		this.loading = true;
		this.$axios({
                    method: "get",
                    url: "/user/fund/query/hold"
                })
                .then(res => {
                    let result = res.data;
                    let status = result.status;
                    if (status == 200) {
                    	this.loading = false;
                      for(let i = 0; i < result.data.length; i++) {
                        result.data[i].netAssetValue = result.data[i].netAssetValue.toFixed(4);
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