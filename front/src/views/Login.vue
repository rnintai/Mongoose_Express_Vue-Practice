<template>
  <div class="mt-4">
    <b-form @submit.prevent="onSubmit">
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
import axios from "axios";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Login",
  data: () => ({
    form: {
      email: null,
      password: null,
      user_id: null,
    },
  }),
  computed: {
    ...mapState(["loggedIn"]),
  },
  methods: {
    ...mapMutations(["logIn"]),
    async onSubmit() {
      await axios
        .post("http://localhost:3000/auth/login", {
          email: this.form.email,
          password: this.form.password,
        })
        .then(async (res) => {
          const token = res.data.token;
          await axios
            .get("http://localhost:3000/users", {
              headers: {
                authorization: `${token}`,
              },
            })
            .then((res) => {
              alert(res.data.msg);
              this.$store.commit("logIn");
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>

<style></style>
