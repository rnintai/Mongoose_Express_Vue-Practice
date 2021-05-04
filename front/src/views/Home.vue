<template>
  <div class="home">
    <div class="modal-bg" v-if="modalOn"><modal /></div>
    <span v-if="loggedIn">
      <span>{{ userInfo.name }}</span>
      <br />
      <b-button variant="outline-primary" @click="openModal">Add</b-button>
      <div class="post-wrap" v-for="item in userInfo.post" :key="item.index">
        {{ item.title }}
        {{ item.content }}
        {{ item.createdAt }}
      </div>
    </span>
    <span v-else>로그인이 필요한 서비스입니다.</span>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import Modal from "@/components/Modal.vue";
// @ is an alias to /src
export default {
  components: { Modal },
  name: "Home",
  computed: {
    ...mapState(["loggedIn", "userInfo", "modalOn"]),
  },
  methods: {
    ...mapActions("addpost", ["addPost"]),
    ...mapMutations(["openModal"]),
  },
};
</script>

<style lang="scss" scoped>
.modal-bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0%;
  left: 0%;
  transition: all 0.2s ease-in-out;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.3);
}
</style>
