<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  meta: {
    title: 'Home',
  },
  created() {
    this.$store.commit("appStore/setPageTitle", "Social Campaigns");
    this.$store.commit("appStore/setPageName", "home");
  }
}
</script>
