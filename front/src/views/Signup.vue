<template>
  <div class="mt-4">
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-1" label="Name" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="E-Mail:" label-for="input-2">
        <b-form-input
          id="input-2"
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

      <b-form-group
        id="input-group-3"
        label="Confirm Password:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="form.password_confirm"
          type="password"
          placeholder="Confirm"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" class="mr-2">Sign Up</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",
  data: () => ({
    form: {
      name: null,
      email: null,
      password: null,
      password_confirm: null,
    },
  }),
  methods: {
    async onSubmit() {
      try {
        await axios.post("http://localhost:3000/auth/signup", {
          email: this.form.email,
          password: this.form.password,
          name: this.form.name,
        });

        this.$router.push({ path: "/login" });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style></style>
