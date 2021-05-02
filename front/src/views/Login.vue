<template>
  <div class="mt-4">
    <b-form @submit.prevent="onSubmit(form)">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" class="mr-2">Log In</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      >
    </b-form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Login",
  data: () => ({
    form: {
      email: null,
      password: null,
    },
  }),
  computed: {
    ...mapState(["loggedIn"]),
  },
  methods: {
    ...mapMutations(["logIn"]),
    ...mapActions(["onSubmit"]),
  },
};
</script>

<style></style>
