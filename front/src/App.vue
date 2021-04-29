<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div id="nav" class="mt-2 mr-5">
      <router-link to="/login">Log in</router-link> |
      <router-link to="/signup">Sign Up</router-link>
    </div>
    <b-container>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: { NavBar },
};
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: flex-end;
}
</style>
