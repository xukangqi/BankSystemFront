<template>
	<div>
		 <a-tabs defaultActiveKey="1">
		    <a-tab-pane tab="汇款申请" key="1"><RemitApplication/></a-tab-pane>
		    <a-tab-pane tab="汇款清算" key="2" forceRender><RemitClearing/></a-tab-pane>
        <a-tab-pane tab="汇款提取" key="3" forceRender><RemitDrawing/></a-tab-pane>
		  </a-tabs>
	</div>
</template>

<script>
import RemitApplication from '@/views/admin/clearing/RemitApplication.vue';
import RemitClearing from '@/views/admin/clearing/RemitClearing.vue';
import RemitDrawing from './RemitDrawing';
export default {
	name:"draft",
  	data() {
    return {
    }
  },
  methods: {
  },
  components: {
  	RemitApplication,
  	RemitClearing,
    RemitDrawing
  }

}
</script>

<style>
</style>