<template>
  <div class="mt-4 d-flex flex-column align-items-center">
    <b-form @submit.prevent="registerUser(form)">
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
          <b-button
            variant="primary"
            class="mr-2"
            @click="checkEmail(form.email)"
            >Check</b-button
          >
          <form-error-message :errors="errors" />
        </b-form-group>
      </validation-provider>

      <validation-provider
        vid="password"
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
        name="Password"
        rules="required|confirmed:password"
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
      <div class="d-flex justify-content-between">
        <b-button type="submit" variant="primary" class="w-75"
          >Sign Up</b-button
        >
        <b-button type="reset" variant="danger" class="w-auto">Reset</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import FormErrorMessage from "../components/FormErrorMessage.vue";
import { createNamespacedHelpers } from "vuex";

const { mapActions } = createNamespacedHelpers("signup");

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
  components: {
    ValidationProvider,
    FormErrorMessage,
  },
  methods: {
    ...mapActions(["registerUser", "checkEmail"]),
  },
};
</script>

<style lang="scss">
.form-group {
  width: 323.25px;
  height: 94px;
  // padding-bottom: 25px;
}
</style>
