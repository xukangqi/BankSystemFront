<template>
	<div>
		<a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
        <a-row>
          <a-col :span="3"/>
          <a-col :span="18">
            <a-form-item label="交易流水号" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="remitId" :fieldDecoratorOptions="{ rules: [{ required: true, message: '流水号不能为空' }]}">
              <a-input placeholder="请输入交易流水号"/>
            </a-form-item>
          </a-col>
          <a-col :span="3"/>
        </a-row>
        <a-row>
          <a-col :span="3"/>
          <a-col :span="18">
            <a-form-item label="收款账号" :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId=" remitInAccount" :fieldDecoratorOptions="{ rules: [{ required: true, message: '收款账号不能为空' }]}">
              <a-input placeholder="请输入收款账号"/>
            </a-form-item>
          </a-col>
          <a-col :span="3"/>
        </a-row>
        <a-row>
          <a-col :span="8" :offset="7">
            <a-form-item>
              <a-button icon="bank" type='primary' htmlType='submit'>
		        提取汇款
		      </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
	</div>
</template>

<script>
	export default {
		name: "RemitDrawing", 
		data() {
			return {

			}
		},
		methods: {
			handleSubmit(e) {
		        e.preventDefault();
		        this.form.validateFields((err, values) => {
		          if (!err) {
		          	console.log("Received values of form: ", values);
		          	this.$axios({
	                    method: 'post',
	                    url: '/clearing/remitdrawingform',
	                    params: {
	                    	remitId: values.remitId,
	                    	remitInAccount: values.remitInAccount,
	                    }
	                  }).then(res => {
	                    let result = res.data;
	                    if (result.status == 200) {
	                      this.$notification.open({
	                        message: "汇款提取成功！",
	                        description: "提取成功！"
	                      });
	                      this.form.resetFields();
	                    } else {
	                      this.$notification.open({
	                        message: "汇款提取失败！",
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
		}
	}
</script>

<style>
	
</style>