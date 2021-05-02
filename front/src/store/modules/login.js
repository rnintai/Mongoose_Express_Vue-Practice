import axios from "axios";
import router from "@/router/index.js";

const state = {
  loggedIn: false,
  loginError: false,
  userInfo: {
    email: null,
    name: null,
    post: null,
  },
};

const mutations = {
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
  logOut(state) {
    state.loggedIn = false;
    state.loginError = false;
    state.userInfo = null;
    localStorage.removeItem("access_token");
  },
};

const actions = {
  async onSubmit({ commit, dispatch }, loginObj) {
    await axios
      .post("http://localhost:3000/auth/login", {
        email: loginObj.email,
        password: loginObj.password,
      })
      .then(async (res) => {
        let token = res.data.token;
        localStorage.setItem("access_token", token);
        dispatch("verifyUser", null, { root: true });
      })
      .catch((err) => {
        alert(err.response.data.message);
        commit("loginFail");
      });
  },
  verifyUser: {
    root: true,
    async handler({ commit }) {
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
  // async verifyUser({ commit }) {
  //   const token = localStorage.getItem("access_token");
  //   await axios
  //     .get("http://localhost:3000/user", {
  //       headers: {
  //         authorization: `${token}`,
  //       },
  //     })
  //     .then((response) => {
  //       alert(response.data.msg);
  //       commit("loginSuccess", response.data.userInfo);
  //       router.push("/");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
