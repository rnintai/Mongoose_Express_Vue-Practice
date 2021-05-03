<template>
  <div class="home">
    <span v-if="loggedIn">
      <span>{{ userInfo.name }}</span>
      <br />
      <div class="post-wrap" v-for="item in userInfo.post" :key="item.index">
        {{ item.title }}
        {{ item.content }}
        {{ item.createdAt }}
      </div>
      <b-button variant="outline-primary" @click="addPost">Add</b-button>
    </span>
    <span v-else>로그인이 필요한 서비스입니다.</span>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
// @ is an alias to /src
export default {
  name: "Home",
  computed: {
    ...mapState(["loggedIn", "userInfo"]),
  },
  methods: {
    ...mapActions("addpost", ["addPost"]),
  },
};
</script>
