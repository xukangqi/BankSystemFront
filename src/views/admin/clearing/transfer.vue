<template>
	<div>
		<div>
		 <a-tabs defaultActiveKey="1">
		    <a-tab-pane tab="转账申请" key="1"><TransferApplication/></a-tab-pane>
		    <a-tab-pane tab="转账清算" key="2" forceRender><TransferClearing/></a-tab-pane>
		  </a-tabs>
	</div>
	</div>
</template>

<script>
import TransferApplication from './TransferApplication.vue'
import TransferClearing from './TransferClearing.vue'
export default {
	data() {
		return {

		}
	},
	components: {
		TransferApplication,
		TransferClearing
	}
}
</script>

<style></style>