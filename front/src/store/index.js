import Vue from "vue";
import Vuex from "vuex";
import login from "./modules/login.js";
import signup from "./modules/signup.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    signup,
  },
});
