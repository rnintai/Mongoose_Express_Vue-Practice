import axios from "axios";
import router from "@/router/index.js";

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async addPost({ rootState }, payload) {
      const email = rootState.userInfo.email;
      const title = payload.title;
      const content = payload.content;

      await axios
        .put("http://localhost:3000/post/add", {
          email,
          title,
          content,
        })
        .then(() => {
          router.go();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async removePost({ rootState }, payload) {
      const email = rootState.userInfo.email;

      await axios
        .put("http://localhost:3000/post/remove", {
          email,
          _id: payload,
        })
        .then(() => {
          console.log("삭제 완료");
          router.go();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
