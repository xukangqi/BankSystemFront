<template>
  <div>
    <a-button type="primary" @click="showDrawer">
      Open
    </a-button>

  </div>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
  },
}
</script>