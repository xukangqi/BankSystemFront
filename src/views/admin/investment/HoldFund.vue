<template>
<div>
  <a-table :columns="columns" :loading="loading" :dataSource="data" :scroll="{ x: 1000 }">
  </a-table>
</div>
</template>
<script>
           
const columns = [
  { title: '用户ID', dataIndex: 'custId', key: 'custId', fixed: 'left' },
  { title: '账户号', dataIndex: 'account', key: 'account' },
  { title: '基金代码', dataIndex: 'fundId', key: 'fundId' },
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
      visible:false,
      columns,
      }
  }, 
  mounted() {
		this.loading = true;
		this.$axios({
                    method: "get",
                    url: "/investment/fundhold"
                })
                .then(res => {
                    let result = res.data;
                    let status = result.status;
                    if (status == 200) {
                    	this.loading = false;
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
  }
}
</script>