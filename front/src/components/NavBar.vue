<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">Sign Up Example</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <div v-if="!loggedIn">
            <b-nav-item to="/login">Log In</b-nav-item>
          </div>
          <div v-else>
            <b-nav-item @click="logOut">Log Out</b-nav-item>
          </div>
          <b-nav-item v-if="!loggedIn" to="/signup">Sign Up</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["loggedIn", "userInfo"]),
  },
  methods: {
    ...mapMutations(["logOut"]),
  },
};
</script>

<style></style>
