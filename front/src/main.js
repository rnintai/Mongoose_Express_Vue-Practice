import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { extend, localize } from "vee-validate";
import { required, email, min, confirmed } from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/en.json";
localize("en", en);

extend("email", email);
extend("required", required);
extend("min", min);
extend("confirmed", confirmed);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.dispatch("verifyUser");
  },
  render: (h) => h(App),
}).$mount("#app");
