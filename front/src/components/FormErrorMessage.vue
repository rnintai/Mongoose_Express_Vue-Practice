<template>
  <span class="text-danger">{{ errors[0] }}</span>
</template>

<script>
export default {
  name: "FormErrorMessage",
  props: {
    errors: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.text-danger {
  font-size: 13px;
}
</style>
