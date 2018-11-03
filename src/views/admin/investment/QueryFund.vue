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
      width=440
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      style="height: calc(100% - 55px);overflow: 'auto';paddingBottom: 53px;"
    >
      

      <a-collapse defaultActiveKey="1" class="customPanelStyle">
        <a-collapse-panel header="基金产品详情" key="1">
          <div style="background:#ECECEC; padding:30px;">
            <a-card :bordered="false" style="width: 300px" hoverable>
              <p>基金代码：{{detailValue.fundId}}</p>
              <p>交易类型：{{detailValue.type}}</p>
              <p>申购费率：{{detailValue.purchaseRate}}%</p>
              <p>基金单位净值：{{detailValue.netAssetValue}}</p>
              <p>赎回费率：{{detailValue.redemptionRate}}%</p>
              <p>记录时间：{{detailValue.purchaseDate}}</p>
            </a-card>
           </div>
        </a-collapse-panel>
        <a-collapse-panel header="基金购买申请" key="2">
          <div style="background:#ECECEC; padding:30px;">
            <a-card :bordered="false" style="width: 300px" hoverable>
              <a-form layout="vertical" :autoFormCreate="(form)=>{this.form = form}">
                <a-row>
                  <a-col :span="3"/>
                  <a-col :span="18">
                    <a-form-item label="基金代码" fieldDecoratorId="fundId">
                      <a-col :span="8" :offset="6">{{this.detailValue.fundId}}</a-col>
                    </a-form-item>
                  </a-col>
                  <a-col :span="3"/>
                </a-row>
                <a-row>
                  <a-col :span="3"/>
                  <a-col :span="18">
                    <a-form-item label='用户名' fieldDecoratorId="name"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '用户名不能为空' }]}">
                       <a-input placeholder="请输入用户名"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="3"/>
                </a-row>
                <a-row>
                  <a-col :span="3"/>
                  <a-col :span="18">
                    <a-form-item label='用户手机号' fieldDecoratorId="phone"
        :fieldDecoratorOptions="{rules: [{required: true, message: '请输入用户手机号' },{validator: this.checkTelephone}]}">
                       <a-input placeholder="请输入用户手机号" />
                    </a-form-item>
                  </a-col>
                  <a-col :span="3"/>
                </a-row>
                <a-row>
                  <a-col :span="3"/>
                  <a-col :span="18">
                    <a-form-item label="账户号" fieldDecoratorId="account" :fieldDecoratorOptions="{ rules: [{ required: true, message: '账户号不能为空' }]}">
                      <a-input placeholder="请输入账户号"/>
                    </a-form-item>
                  </a-col>
                  <a-col :span="3"/>
                </a-row>
                <a-row>
                  <a-col :span="3"/>
                  <a-col :span="18">
                    <a-form-item label="交易类型" fieldDecoratorId="type">
                      <a-col :span="8" :offset="8">{{this.detailValue.type}}</a-col>
                    </a-form-item>
                  </a-col>
                  <a-col :span="3"/>
                </a-row>
                <a-row>
                  <a-col :span="3"/>
                  <a-col :span="18">
                    <a-form-item label="投资金额" fieldDecoratorId="amount":fieldDecoratorOptions="{ rules: [{ required: true, message: '投资金额不能为空' }]}">
                      <a-input placeholder="请输入投资金额" />
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
        </a-collapse-panel>
      </a-collapse>

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
    this.reviewerId=this.$store.getters.user.userId;
		this.$axios({
                    method: "get",
                    url: "/user/fund/query/product"
                })
                .then(res => {
                    let result = res.data;
                    let status = result.status;
                    if (status == 200) {
                    	this.loading = false;
                    	for(let i=0; i<result.data.length; i++) {
                    		result.data[i].type = (result.data[i].type==0?"认购":"申购");
                    		result.data[i].purchaseRate = result.data[i].purchaseRate.toFixed(2);
                    		result.data[i].netAssetValue = result.data[i].netAssetValue.toFixed(4);
                    		result.data[i].redemptionRate = result.data[i].redemptionRate.toFixed(2);
                        result.data[i].purchaseDate = this.formatDate(result.data[i].purchaseDate);
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
      pwd: undefined,
      reviewerId: '',
      drawFundId: '',
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
            text: "认购",
            value: "认购"
            },
            {
            	text: "申购",
            	value: "申购"
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
		  dataIndex: 'purchaseDate',
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
      this.drawFundId = value;
      this.$axios({
                    method: "get",
                    url: "/investment/funddetail/" + this.drawFundId
                })
                .then(res => {
                    let result = res.data;
                    let status = result.status;
                    let fundDetail = result.data.fundDetail;
                    if (status == 200) {
                      fundDetail.type = (fundDetail.type==0?"认购":"申购");
                      fundDetail.purchaseRate = fundDetail.purchaseRate.toFixed(2);
                      fundDetail.netAssetValue = fundDetail.netAssetValue.toFixed(4);
                      fundDetail.redemptionRate = fundDetail.redemptionRate.toFixed(2);
                      fundDetail.purchaseDate = this.formatDate(fundDetail.purchaseDate);
                      this.detailValue = fundDetail;   
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
    formatDate(value) {
                let date = new Date(parseInt(value) / 1000);
                return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    handleSubmit(e) {
              e.preventDefault();
              this.form.validateFields((err, values) => {
                if (!err) {
                  values.fundId = this.detailValue.fundId;
                  values.type = this.detailValue.type;
                  console.log("Received values of form: ", values);this.$axios({
                    method: 'post',
                    url: '/user/fund/create/tx/purchase',
                    params: {
                      fundId: values.fundId,
                      name: values.name,
                      phone: values.phone,
                      account: values.account,
                      type: values.type,
                      amount: values.amount,
                      password: values.password,
                      reviewerId: this.reviewerId
                    }
                  }).then(res => {
                    let result = res.data;
                    if (result.status == 200) {
                      this.$notification.open({
                        message: "基金购买申请成功！",
                        description: "提交申请成功！"
                      });
                    } else {
                      this.$notification.open({
                        message: "基金购买申请失败！",
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
    checkTelephone(rule, value, callback) {
                if (value.length == 0) {
                  callback();
                }
                if (!/^1[34578]\d{9}$/.test(value)) {
                  callback("手机号码错误");
                } else {
                  callback();
                }
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

.customPanelStyle {
  background: #f7f7f7;
  borderRadius: 50;
  marginBottom: 24;
  border: 0;
  overflow: hidden;
}
</style>