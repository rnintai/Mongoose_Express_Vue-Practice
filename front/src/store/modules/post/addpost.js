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
        .put("http://localhost:3000/post/addpost", {
          email,
          title,
          content,
        })
        .then(() => {
          alert("추가되었습니다.");
          router.go();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
