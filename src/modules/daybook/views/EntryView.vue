<template>
  <template v-if="entry">
    <div class="entry-title d-flex justify-content-between p-2">
      <!-- Title -->
      <div>
        <span class="text-success fs-3 fw-bold">{{ day }}</span>
        <span class="mx-1 fs-3">{{ month }}</span>
        <span class="mx-2 fs-4 fw-ligth">{{ yearDay }}</span>
      </div>

      <!-- Header -->
      <div>
        <button class="btn btn-danger mx-2">
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary">
          Subir Foto
          <i class="fa fa-upload"></i>
        </button>
      </div>
    </div>

    <!-- Content -->
    <hr />
    <div class="d-flex flex-column px-3 h-75">
      <textarea placeholder="Que sucedio hoy?" v-model="entry.text" />
    </div>
  </template>
  <Fab icon="fa-save" @onClick="saveEntry" />

  <img
    src="https://www.fobiass.com/images/claustrofobia-test1.jpg"
    alt="imgTEST"
    class="img-thumbnail"
  />
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapGetters, mapActions } from "vuex";
import getDayMonthYear from "../helpers/dateHelpers";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      entry: null,
    };
  },
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
  },
  computed: {
    ...mapGetters("journal", ["getEntriesById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    yearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },
  methods: {
    ...mapActions("journal", ["updateEntries"]),
    loadEntry() {
      const entry = this.getEntriesById(this.id);
      if (!entry) return this.$router.push({ name: "no-entry" });
      this.entry = entry;
    },
    async saveEntry() {
      this.updateEntries(this.entry);
    },
  },
  created() {
    this.loadEntry();
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100vh;

  &:focus {
    outline: none;
  }
}

img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>
