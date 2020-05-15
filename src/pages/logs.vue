<template>
  <q-page class="fit row justify-center">
    <q-card class="col">
      <q-card-section>
        <hasura-datatable
          :cols="$store.state.appStore.logs.columns"
          :gql-queries="gqlQueries"
          model-name="log"
        >
          <template v-slot:body-cell="{ props }">
            <table-cell
              v-if="props.col.type === 'badge'"
              :props="finalProps(props)"
            >
            </table-cell>
          </template>
        </hasura-datatable>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import gql from "graphql-tag";
import clone from "clone";
import HasuraDatatable from "../components/HasuraDataTable";
import TableCell from "../components/TableCell";
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

export default {
  name: "Logs",
  components: { HasuraDatatable, TableCell },
  data() {
    return {
      gqlQueries: {
        query: LOGS_QUERY,
        aggregate: LOGS_AGGREGATE
      }
    };
  },
  methods: {
    finalProps(props) {
      const finalProps = clone(props);
      if (finalProps.value === "ERROR") {
        finalProps.col.settings.color = "red";
      }
      return finalProps;
    }
  }
};
</script>

<style>
.th-id {
  min-width: 150px;
}
</style>
