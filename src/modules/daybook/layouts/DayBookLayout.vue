<template>
  <NavBar />

  <div class="d-flex">
    <div class="col-4">
      <EntryList />
    </div>
    <div class="col">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import EntryList from "../components/EntriList.vue";
export default {
  components: {
    NavBar,
    EntryList,
  },
};
</script>
