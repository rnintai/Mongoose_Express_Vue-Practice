import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router/index.js";

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
  },
  actions: {
    async onSubmit({ commit, dispatch }, loginObj) {
      await axios
        .post("http://localhost:3000/auth/login", {
          email: loginObj.email,
          password: loginObj.password,
        })
        .then(async (res) => {
          dispatch("verifyUser", res);
        })
        .catch((err) => {
          alert(err.response.data.message);
          commit("loginFail");
          // router.go("/login");
        });
    },
    async verifyUser({ commit }, res) {
      const token = res.data.token;
      await axios
        .get("http://localhost:3000/user", {
          headers: {
            authorization: `${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          alert(response.data.msg);
          commit("loginSuccess", response.data.userInfo);
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
