<template>
  <div class="home">
    <span v-if="loggedIn"
      ><div>{{ userInfo.name }}님의 ToDoList</div></span
    >
    <span v-else>로그인이 필요한 서비스입니다.</span>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers("login");
// @ is an alias to /src
export default {
  name: "Home",
  computed: {
    ...mapState(["loggedIn", "userInfo"]),
  },
};
</script>
