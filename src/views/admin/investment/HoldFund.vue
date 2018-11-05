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

     <template slot="operation" slot-scope="text, record">
                <a-button type='primary' @click="() => showDrawer(record.account, record.fundId)">基金赎回</a-button>
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

  <a-drawer
      width=400
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px;"
    >
      <div style="background:#ECECEC; padding:30px;">
      <a-card title="基金赎回申请" :bordered="false" style="width: 300px" hoverable>
        <a-form layout="vertical" :autoFormCreate="(form)=>{this.form = form}">
                <a-row>
                  <a-col :span="3"/>
                  <a-col :span="18">
                    <a-form-item label="账户号" fieldDecoratorId="account">
                      <a-col :span="8" :offset="8">{{this.detailValue.account}}</a-col>
                    </a-form-item>
                  </a-col>
                  <a-col :span="3"/>
                </a-row>
                <a-row>
                  <a-col :span="3"/>
                  <a-col :span="18">
                    <a-form-item label="基金代码" fieldDecoratorId="fundId">
                      <a-col :span="8" :offset="8">{{this.detailValue.fundId}}</a-col>
                    </a-form-item>
                  </a-col>
                  <a-col :span="3"/>
                </a-row>
                <a-row>
                  <a-col :span="3"/>
                  <a-col :span="18">
                    <a-form-item label="赎回份额" fieldDecoratorId="share":fieldDecoratorOptions="{ rules: [{ required: true, message: '赎回份额不能为空' }]}">
                      <a-col :span="8" :offset="6"><a-input-number :min="1" size="large"/></a-col>
                    </a-form-item>
                  </a-col>
                  <a-col :span="3"/>
                </a-row>
                <a-row>
                  <a-col :span="3"/>
                  <a-col :span="18">
                    <a-form-item label="账户密码" fieldDecoratorId="password" :fieldDecoratorOptions="{ rules: [{ required: true, message: '密码不能为空' }]}">
                      <a-input placeholder="请输入账户密码" v-model = "pwd" type="password" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="3"/>
                </a-row>
                <a-row>
                  <a-col :span="3"/>
                  <a-col :span="18">
                    <a-form-item label="重新输入密码" fieldDecoratorId="confirmpwd" :fieldDecoratorOptions="{ rules: [{ required: true, message: '密码不能为空' },{validator: this.checkPassword}]}">
                      <a-input placeholder="请再次输入账户密码" type="password"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="3"/>
                </a-row>
                <a-row>
                  <a-col :span="6"/>
                  <a-col :span="15">
                    <a-form-item>
                      <a-button-group>
                        <a-button type='primary' htmlType='submit' @click="handleSubmit">提交</a-button>
                        <a-button type='danger' @click="handleFormReset">重置</a-button>
                      </a-button-group>
                    </a-form-item>
                  </a-col>
                  <a-col :span="3"/>
                </a-row>
              </a-form>
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
  }, { title: '份额', dataIndex: 'share', key: 'share',
    sorter: (a, b) => a.share - b.share
  }, {
      title: '操作',
      dataIndex: 'operation',
      fixed:'right', width:150,
      scopedSlots: {
        customRender: 'operation'
      }
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
      pwd: undefined,
      reviewerId: '',
      drawAccount: '',
      drawFundId: '',
      columns,
      }
  },
  mounted() {
		this.loading = true;
    this.reviewerId=this.$store.getters.user.userId;
		this.$axios({
                    method: "get",
                    url: "/user/fund/query/hold"
                    // url: "/investment/fundhold"
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
    onClose() {
      this.visible = false
    },
    showDrawer(value1, value2) {
      this.visible = true;
      this.drawAccount = value1;
      this.drawFundId = value2;
      this.$axios({
                    method: "get",
                    url: "/user/query/holddetail?account=" + this.drawAccount + "&fundId=" + this.drawFundId
                    // url: "/investment/fundholddetail"
                })
                .then(res => {
                    let result = res.data;
                    let status = result.status;
                    let fundHoldDetail = result.data.fundHoldDetail;
                    if (status == 200) {
                      this.detailValue = fundHoldDetail;   
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
    handleSubmit(e) {
              e.preventDefault();
              this.form.validateFields((err, values) => {
                if (!err) {
                  values.fundId = this.detailValue.fundId;
                  values.account = this.detailValue.account;
                  console.log("Received values of form: ", values);this.$axios({
                    method: 'post',
                    url: '/user/fund/create/tx/purchase',
                    params: {
                      account: values.account,
                      fundId: values.fundId,
                      share: values.share,
                      password: values.password,
                      reviewerId: this.reviewerId
                    }
                  }).then(res => {
                    let result = res.data;
                    if (result.status == 200) {
                      this.$notification.open({
                        message: "基金赎回申请成功！",
                        description: "提交申请成功！"
                      });
                    } else {
                      this.$notification.open({
                        message: "基金赎回申请失败！",
                        description: result.msg
                      });
                    }
                  }).catch(err => {
                    console.log(err);
                    this.$notification.open({
                      message: "错误",
                      description: "服务器开小差了,请稍后再试"
                    });
                  })
                }
              });
    },
    handleFormReset() {
      this.form.resetFields();
    },
    checkPassword(rule, value, callback) {
        if (typeof (value) == undefined) {
          callback('请再次输入密码');
        } else {
          if (value === this.pwd) {
            callback();
          } else {
            callback('密码不一致');
          }
        }
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