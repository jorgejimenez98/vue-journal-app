<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>

  <button @click="goToDaybook" type="button" class="btn btn-primary">Day Book</button>
  <button type="button" class="btn btn-secondary">Primary</button>
  <button type="button" class="btn btn-warning">Primary</button>
</template>

<script>
export default {
  methods: {
    goToDaybook() {
      this.$router.push({ name: "no-entry" });
    },
  },
};
</script>
