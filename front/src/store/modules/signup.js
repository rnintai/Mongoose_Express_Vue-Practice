import axios from "axios";
import router from "@/router/index.js";

export default {
  namespaced: true,
  state: {
    isChecked: false,
    form: {
      name: null,
      email: null,
      password: null,
      password_confirm: null,
    },
  },
  mutations: {
    emailChecked(state) {
      state.isChecked = true;
    },
  },
  actions: {
    async checkEmail({ commit }, payload) {
      await axios
        .post("http://localhost:3000/auth/check", {
          email: payload,
        })
        .then((res) => {
          commit("emailChecked");
          alert(res.data);
        })
        .catch((err) => {
          alert(err.response.data.data[0].msg);
        });
    },
    async registerUser({ state }, payload) {
      if (!state.isChecked) {
        alert("이메일 중복확인을 해주세요.");
        return;
      }
      await axios
        .post("http://localhost:3000/auth/signup", {
          email: payload.email,
          password: payload.password,
          name: payload.name,
        })
        .then(() => {
          alert(`${payload.name}님 환영합니다!`);
          router.push("/login");
        })
        .catch((err) => {
          alert(err.response.data.data[0].msg);
        });
    },
  },
};
