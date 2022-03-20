import { createStore } from "vuex";

/* Modules */
import journal from "@/modules/daybook/store/journal";

const store = createStore({
  modules: {
    journal,
  },
});

export default store;
