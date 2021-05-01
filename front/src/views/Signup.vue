<template>
  <div class="mt-4">
    <b-form @submit.prevent="onSubmit">
      <validation-provider name="Name" rules="required" v-slot="{ errors }">
        <b-form-group id="input-group-1" label="Name" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.name"
            type="text"
            placeholder="Enter name"
            required
          ></b-form-input>
          <form-error-message :errors="errors" />
        </b-form-group>
      </validation-provider>

      <validation-provider
        name="E-Mail"
        rules="required|email"
        v-slot="{ errors }"
      >
        <b-form-group id="input-group-2" label="E-Mail:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
          <b-button variant="primary" class="mr-2" @click="check_email"
            >Check</b-button
          >
          <form-error-message :errors="errors" />
        </b-form-group>
      </validation-provider>

      <validation-provider
        name="Password"
        rules="required|min:6"
        v-slot="{ errors }"
      >
        <b-form-group id="input-group-3" label="Password:" label-for="input-2">
          <b-form-input
            id="input-3"
            type="password"
            v-model="form.password"
            placeholder="Enter password"
            required
          ></b-form-input>
          <form-error-message :errors="errors" />
        </b-form-group>
      </validation-provider>

      <validation-provider
        name="Confirm Password"
        rules="required|min:6"
        v-slot="{ errors }"
      >
        <b-form-group
          id="input-group-4"
          label="Confirm Password:"
          label-for="input-3"
        >
          <b-form-input
            id="input-4"
            v-model="form.password_confirm"
            type="password"
            placeholder="Confirm"
            required
          ></b-form-input>
          <form-error-message :errors="errors" />
        </b-form-group>
      </validation-provider>

      <b-button type="submit" variant="primary" class="mr-2">Sign Up</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import { ValidationProvider } from "vee-validate";
import FormErrorMessage from "../components/FormErrorMessage.vue";

export default {
  name: "Signup",
  data: () => ({
    form: {
      name: null,
      email: null,
      password: null,
      password_confirm: null,
      isChecked: false,
    },
  }),
  components: {
    ValidationProvider,
    FormErrorMessage,
  },
  methods: {
    async onSubmit() {
      if (!this.isChecked) {
        alert("이메일 중복확인을 해주세요.");
        return;
      }
      await axios
        .post("http://localhost:3000/auth/signup", {
          email: this.form.email,
          password: this.form.password,
          name: this.form.name,
        })
        .then(() => {
          this.$router.push("/login");
        })
        .catch((err) => {
          alert(err.response.data.data[0].msg);
        });
    },
    async check_email() {
      await axios
        .post("http://localhost:3000/auth/check", {
          email: this.form.email,
        })
        .then((res) => {
          alert(res.data);
        })
        .catch((err) => {
          alert(err.response.data.data[0].msg);
        });
    },
  },
};
</script>

<style lang="scss"></style>
