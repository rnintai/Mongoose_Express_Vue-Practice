<template>
  <div id="app">
    <nav-bar></nav-bar>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  components: { NavBar },
};
</script>

<style lang="scss">
@import "assets/css/reset.css";
@import "assets/css/main.scss";
#app {
  .nav {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
