<template>
  <q-page class="fit row justify-center">
    <q-card class="col">
      <q-card-section>
        <hasura-datatable
          :cols="$store.state.appStore.logs.columns"
          :gql-queries="gqlQueries"
          model-name="log"
          :show-filters="pageSettings.filters"
          :show-popup-editors="pageSettings.popupEditing"
          :show-top-actions="pageSettings.topActions"
          :show-row-actions="pageSettings.rowActions"
          @create="createItem"
        >
        </hasura-datatable>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import gql from "graphql-tag";
import clone from "clone";
import HasuraDatatable from "../components/HasuraDataTable";
const LOGS_QUERY = gql`
  query log(
    $limit: Int
    $where: log_bool_exp
    $order_by: [log_order_by!]
    $offset: Int
  ) {
    log(limit: $limit, where: $where, order_by: $order_by, offset: $offset) {
      id
      message
      type
      account {
        id
        username
      }
      host_name
      created_at
    }
  }
`;
const LOGS_AGGREGATE = gql`
  query log_aggregate($where: log_bool_exp) {
    log_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
const LOG_UPDATE = gql`
  mutation update_log($_set: log_set_input, $where: log_bool_exp!) {
    update_log(where: $where, _set: $_set) {
      affected_rows
      returning {
        id
        message
      }
    }
  }
`;
const LOGS_DELETE = gql`
  mutation delete_log($where: log_bool_exp!) {
    delete_log(where: $where) {
      affected_rows
    }
  }
`;

export default {
  name: "Logs",
  meta: {
    title: "Logs"
  },
  components: { HasuraDatatable },
  data() {
    return {
      gqlQueries: {
        query: LOGS_QUERY,
        aggregate: LOGS_AGGREGATE,
        update: LOG_UPDATE,
        delete: LOGS_DELETE
      }
    };
  },
  mounted() {
    this.$store.commit("appStore/setActivePageName", "logs");
  },
  computed: {
    pageStore(){
      const activePageName = this.$store.state.appStore.activePageName
      if(activePageName){
        return this.$store.state.appStore[activePageName].page
      }
      return this.$store.state.appStore.page
    },
    pageSettings() {
      return this.pageStore.settings;
    }
  },
  methods: {
    createItem(){
      this.$router.push("/logs/create");
    }
  }
};
</script>

<style>
.th-id {
  min-width: 150px;
}
</style>
