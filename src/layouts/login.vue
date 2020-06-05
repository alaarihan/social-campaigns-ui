<template>
  <q-layout view="hHh LpR fFf">
    <q-page-container>
      <slot name="router">
        <router-view />
      </slot>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "Login",
  meta: {
    titleTemplate: title => `${title} - Social Campaigns`
  },
  data() {
    return {};
  }
};
</script>
