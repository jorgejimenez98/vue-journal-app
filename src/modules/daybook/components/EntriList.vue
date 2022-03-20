<template>
  <div class="entry-list-container">
    <div class="px-2 pt-2">
      <input
        type="text"
        class="form-control"
        v-model="term"
        placeholder="Buscar entrada!!!"
      />
    </div>

    <div class="mt-2 d-flex flex-column">
      <button
        class="btn btn-primary mx-3"
        @click="$router.push({ name: 'entry', params: { id: 'new' } })"
      >
        <i class="fa fa-plus-circle"></i>
        Nueva Entrada
      </button>
    </div>

    <div class="entry-scrollarea">
      <template v-for="(item, idx) in entriesByTerm" :key="idx">
        <EntryItem :item="item" />
      </template>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      term: "",
    };
  },
  components: {
    EntryItem: defineAsyncComponent(() => import("./EntryItem.vue")),
  },
  computed: {
    ...mapGetters("journal", ["getEntriesByTerm"]),
    entriesByTerm() {
      return this.getEntriesByTerm(this.term);
    },
  },
};
</script>

<style lang="scss" scoped>
.entry-list-container {
  border-right: 1px solid #2c3e50;
  height: calc(100vh - 50px);
}

.entry-scrollarea {
  height: calc(100vh - 15px);
  overflow: scroll;
}
</style>
