<template>
  <div class="home">
    <div class="after-loaded" v-if="this.$store.state.loading !== true">
      <div class="modal-bg" v-if="modalOn"><add-modal /></div>
      <div v-if="loggedIn" class="logged-in">
        <div class="my-page">
          <span>{{ userInfo.name }}'s Post</span>
          <b-button variant="outline-primary" @click="openModal">Add</b-button>
        </div>
        <post-box :post="userInfo.post"></post-box>
      </div>
      <span v-else>로그인이 필요한 서비스입니다.</span>
    </div>
    <div class="before-loaded" v-else>
      <clip-loader
        :loading="this.$store.state.loading"
        color="#000000"
        size="15px"
      ></clip-loader>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import AddModal from "@/components/modals/AddModal.vue";
import PostBox from "@/components/Home/PostBox.vue";
import ClipLoader from "vue-spinner/src/ClipLoader.vue";
// @ is an alias to /src
export default {
  components: { AddModal, PostBox, ClipLoader },
  name: "Home",
  computed: {
    ...mapState(["loggedIn", "userInfo", "modalOn"]),
  },
  methods: {
    ...mapMutations(["openModal"]),
  },
};
</script>

<style lang="scss" scoped>
.home {
  transition: all 0.3s ease-in-out;
  .after-loaded {
    .modal-bg {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0%;
      left: 0%;
      backdrop-filter: blur(5px);
      background: rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease-in-out;
    }
    .logged-in {
      .my-page {
        margin: 8px 0;
        padding: 0 8px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  .before-loaded {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
  }
}
</style>
