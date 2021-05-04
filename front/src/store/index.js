import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import login from "./modules/login.js";
import signup from "./modules/signup.js";
import addpost from "./modules/post/addpost.js";
import router from "@/router/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      email: null,
      name: null,
      post: null,
    },
    loggedIn: false,
    loginError: false,
    modalOn: false,
  },
  mutations: {
    loginSuccess(state, payload) {
      console.log(state);
      state.loggedIn = true;
      state.loginError = false;
      state.userInfo = payload;
    },
    loginFail(state) {
      state.loggedIn = false;
      state.loginError = true;
    },
    logOut(state) {
      state.loggedIn = false;
      state.loginError = false;
      state.userInfo = null;
      localStorage.removeItem("access_token");
    },
    openModal(state) {
      state.modalOn = true;
    },
    closeModal(state) {
      state.modalOn = false;
    },
  },
  actions: {
    async verifyUser({ commit }) {
      const token = localStorage.getItem("access_token");
      await axios
        .get("http://localhost:3000/user", {
          headers: {
            authorization: `${token}`,
          },
        })
        .then((res) => {
          commit("loginSuccess", res.data.userInfo);
          router.replace("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {
    login,
    signup,
    addpost,
  },
});
