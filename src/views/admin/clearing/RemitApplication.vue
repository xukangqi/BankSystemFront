<template>
	<a-form @submit="handleSubmit" :autoFormCreate="(form)=>{this.form = form}" style="margin-top:20px">
		<h2 style="margin-left:38%;margin-bottom:20px">汇款申请</h2>
		<a-form-item label='申请人' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="name"
	      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入申请人姓名' }]}">
	     <a-input />
	 	</a-form-item>
	 	<a-form-item label='申请人手机号' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="phone"
	      :fieldDecoratorOptions="{rules: [{required: true, message: '请输入用户手机号' },{validator: this.checkTelephone}]}">
	     <a-input />
	 	</a-form-item>
	 	<a-form-item label='付款账户号' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="remitOutAccount"
	      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入付款账户号' }]}">
	     <a-input />
	 	</a-form-item>
	 	<a-form-item label='收款账户号' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="remitInAccount"
	      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入收款账户号' }]}">
	     <a-input />
	 	</a-form-item>
	 	<a-form-item label='汇款金额' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="amount"
	      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入汇款金额' }]}">
	      <a-input/>
	 	</a-form-item>
	 	<a-form-item label='申请人账户密码' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="password"
	      :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入申请人账户密码' }]}">
	     <a-input type="password" v-model="password"/>
	 	</a-form-item>
	 	 <a-form-item label='重复申请人账户密码' :labelCol="{ span: 5 }" :wrapperCol="{ span: 12 }" fieldDecoratorId="password2"
      :fieldDecoratorOptions="{rules: [{ required: true, message: '请再次输入申请人账户密码'},{validator: this.checkPassword}]}">
      <a-input type="password" />
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
				password: undefined,
				returnData: ''
			}
		},
		methods: {
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
			handleSubmit(e) {
		        e.preventDefault();
		        this.form.validateFields((err, values) => {
		          if (!err) {
		          	console.log("Received values of form: ", values);
		          	this.$axios({
	                    method: 'post',
	                    url: '/user/remit/create',
	                    params: {
	                    	name: values.name,
	                    	phone: values.phone,
	                    	remitOutAccount: values.remitOutAccount,
	                    	remitInAccount: values.remitInAccount,
	                    	amount: values.amount,
	                    	password: values.password
	                    }
	                  }).then(res => {
	                    let result = res.data;
	                    if (result.status == 200) {
                      	  this.form.resetFields();
	                      this.returnData = result.data;
	                      setTimeout(() => {
                  			this.$router.push('/admin/clearing/remit-clearing');
                		  }, 100);
	                      this.$notification.open({
	                        message: "汇款申请成功！",
	                        description: "汇票流水号为：" + this.returnData
	                      });
	                    } else {
	                      this.$notification.open({
	                        message: "汇款申请失败！",
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
		     checkPassword(rule, value, callback) {
		        if (typeof (value) == undefined) {
		          callback('请再次输入密码');
		        } else {
		          if (value === this.password) {
		            callback();
		          } else {
		            callback('密码不一致');
		          }
		        }
		      }
		}

	}
</script>

<style>
	
</style>
