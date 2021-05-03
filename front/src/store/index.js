import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import login from "./modules/login.js";
import signup from "./modules/signup.js";
import router from "@/router/index.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    loginError: false,
    userInfo: {
      email: null,
      name: null,
      post: null,
    },
  },
  mutations: {
    loginSuccess(state, payload) {
      console.log(state);
      state.loggedIn = true;
      state.loginError = false;
      state.userInfo.email = payload.email;
      state.userInfo.name = payload.name;
      state.userInfo.post = payload.post;
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
        .then((response) => {
          commit("loginSuccess", response.data.userInfo);
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {
    login,
    signup,
  },
});
