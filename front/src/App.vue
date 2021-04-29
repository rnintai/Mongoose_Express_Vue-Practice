<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div id="nav">
      <router-link to="/login">Log in</router-link> |
      <router-link to="/signup">Sign Up</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  components: { NavBar },
};
</script>

<style lang="scss"></style>
