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
        <button
          class="btn btn-danger mx-2"
          v-if="entry.id"
          @click="onDeleteEntry"
        >
          Borrar
          <i class="fa fa-trash-alt"></i>
        </button>

        <input
          type="file"
          @change="onChangeImage"
          ref="inputFile"
          v-show="false"
          accept="image/png, image/jpeg"
        />
        <button class="btn btn-primary" @click="onSelectImage">
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

  <!--   <img
    src="https://www.fobiass.com/images/claustrofobia-test1.jpg"
    alt="imgTEST"
    class="img-thumbnail"
  /> -->
  <img
    v-if="localImage"
    :src="localImage"
    alt="imgTEST"
    class="img-thumbnail"
  />
</template>

<script>
import { defineAsyncComponent } from "@vue/runtime-core";
import { mapGetters, mapActions } from "vuex";
import getDayMonthYear from "../helpers/dateHelpers";
import Swal from "sweetalert2";

export default {
  name: 'EntryView',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      entry: null,
      localImage: null,
      file: null,
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
    ...mapActions("journal", ["updateEntries", "createEntries", "deleteEntry"]),
    loadEntry() {
      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntriesById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }
      this.entry = entry;
    },
    async saveEntry() {
      // Message
      new Swal({
        title: "Espere Por favor",
        allowOutsideClick: false,
      });
      Swal.showLoading();
      // Save
      if (this.entry.id) {
        this.updateEntries(this.entry);
      } else {
        const dataId = await this.createEntries(this.entry);
        this.$router.push({ name: "entry", params: { id: dataId } });
      }

      Swal.fire("Guardado", "Entrada registrada OK", "success");
    },
    async onDeleteEntry() {
      // Confirmation con SWAL
      const result = await Swal.fire({
        title: "Estas seguro de eliminar?",
        text: "No se puede recuperar",
        showDenyButton: true,
        confirmButtonText: "Si, estoy seguro",
      });

      if (result.isConfirmed) {
        Swal.fire({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        Swal.showLoading();
        await this.deleteEntry(this.entry.id);
        this.$router.push({ name: "no-entry" });

        Swal.fire("Eliminado OK", "", "success");
      }
    },
    onChangeImage(event) {
      const image = event.target.files[0];
      if (!image) {
        this.localImage = null;
        this.file = null;
        return;
      }
      // Proceess Image
      const fr = new FileReader();
      fr.onload = () => (this.localImage = fr.result);
      fr.readAsDataURL(image);
      this.file = image;
    },
    onSelectImage() {
      // Simular levantar para buscar imagen
      this.$refs.inputFile.click();
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
