import Vue from "vue";
import Vuex from "vuex";
import sidebar from "./modules/sidebar";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    sidebar
  },
  strict: debug
});
