<template>
  <button class="btn btn-primary" @click="clickEvent">
    <i class="fa fa-2x" :class="icon"></i>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "fa-plus",
    },
  },
  methods: {
    clickEvent() {
      this.$emit('onClick')
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  bottom: 20px;
  height: 60px;
  position: fixed;
  right: 20px;
  width: 60px;
  border-radius: 100%;
}
</style>
