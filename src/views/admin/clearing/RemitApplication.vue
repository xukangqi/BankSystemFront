<template>
	<a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}">
		<a-form-item label='申请人' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="name"
	      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入申请人姓名' }]}">
	     <a-input />
	 	</a-form-item>
	 	<a-form-item label='付款账户号' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="remit_out_account"
	      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入付款账户号' }]}">
	     <a-input />
	 	</a-form-item>
	 	<a-form-item label='收款账户号' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="remit_in_account"
	      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入收款账户号' }]}">
	     <a-input />
	 	</a-form-item>
	 	<a-form-item label='汇款金额' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="amount"
	      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入汇款金额' }]}">
	      <a-input/>
	 	</a-form-item>
	 	<a-form-item label='汇款生成时间' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="remit_generate_date">
	 		{{CurrentTime}}
	 		<a-input type="hidden" :value=this.CurrentTime />
	 	</a-form-item>
	 	<a-form-item :wrapperCol="{ span: 12, offset: 5 }">
	      <a-button type='primary' htmlType='submit'>
	        提交
	      </a-button>
	    </a-form-item>
	</a-form>
</template>

<script>
	export default {
		data() {
			return {
				CurrentTime: ''
			}
		},
		methods: {
			getCurrentTime() {
				var date = new Date();
				var seperator = "-";
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var strDate = date.getDate();
				if(month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if(strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				return year + seperator + month + seperator + strDate;
			},
			handleSubmit(e) {
		        e.preventDefault();
		        this.form.validateFields((err, values) => {
		          if (!err) {
		            console.log("Received values of form: ", values);
		          }
		        });
		     }
		}, 
		created() {
			this.CurrentTime = this.getCurrentTime();
		}

	}
</script>

<style>
	
</style>
