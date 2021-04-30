<template>
  <div id="app">
    <nav-bar></nav-bar>
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
