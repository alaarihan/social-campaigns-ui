<template>
  <q-page class="fit row justify-center">
    <q-card class="col">
      <q-card-section>
        <hasura-create
          :cols="typeStore.columns"
          :create-query="typeStore.queries.create"
          model-name="log"
          @created="goBack"
          @canceled="goBack"
        >
        </hasura-create>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import clone from "clone";
import HasuraCreate from "../../components/HasuraCreate";

export default {
  name: "CreateType",
  meta() {
    return {
      title: `Create ${
        this.typeStore.type.title
      }`
    };
  },
  components: { HasuraCreate },
  data() {
    return {};
  },
  created() {
    this.$store.commit(
      "appStore/setPageTitle",
      `Create ${this.typeStore.type.title}`
    );
    this.$store.commit("appStore/setPageSetting", {
      setting: "backToUrl",
      value: `/${this.$route.params.type}`
    });
  },
  computed: {
    typeStore() {
      return this.$store.state.appStore[this.$route.params.type];
    }
  },
  methods: {
    goBack() {
      this.$router.push(`/${this.$route.params.type}`);
    }
  }
};
</script>

<style>
.th-id {
  min-width: 150px;
}
</style>
