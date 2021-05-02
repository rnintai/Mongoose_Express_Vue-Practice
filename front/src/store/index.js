import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginObj: {
      email: null,
      password: null,
    },
    loggedIn: false,
    userInfo: {
      email: null,
      name: null,
      post: null,
    },
  },
  mutations: {
    loginSuccess(state, payload) {
      state.loggedIn = true;
      state.userInfo = payload;
    },
  },
  actions: {
    async onSubmit({ commit }, loginObj) {
      await axios
        .post("http://localhost:3000/auth/login", {
          email: loginObj.email,
          password: loginObj.password,
        })
        .then(async (res) => {
          const token = res.data.token;
          await axios
            .get("http://localhost:3000/user", {
              headers: {
                authorization: `${token}`,
              },
            })
            .then((res) => {
              alert(res.data.msg);
              commit("loginSuccess", res.data.userInfo);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  modules: {},
});
