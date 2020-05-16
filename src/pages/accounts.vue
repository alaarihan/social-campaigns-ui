<template>
  <q-page class="fit row justify-center">
    <q-card class="col">
      <q-card-section>
        <hasura-datatable
          :cols="$store.state.appStore.accounts.columns"
          :gql-queries="gqlQueries"
          model-name="account"
          :show-filters="true"
          :show-popup-editors="pageSettings.popupEditing"
          :show-bulk-actions="pageSettings.bulkActions"
          :show-row-actions="pageSettings.rowActions"
        >
          <template v-slot:body-cell="{ props }">
            <table-cell
              v-if="props.col.type === 'badge'"
              :props="finalProps(props)"
              :show-editor="false"
              v-model="props.value"
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
const ACCOUNTS_QUERY = gql`
  query account(
    $limit: Int
    $where: account_bool_exp
    $order_by: [account_order_by!]
    $offset: Int
  ) {
    account(
      limit: $limit
      where: $where
      order_by: $order_by
      offset: $offset
    ) {
      id
      username
      password
      email
      status
      status_duration
      credit
      last_activity
      notes
      created_at
      updated_at
    }
  }
`;
const ACCOUNTS_AGGREGATE = gql`
  query account_aggregate($where: account_bool_exp) {
    account_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
const ACCOUNT_UPDATE = gql`
  mutation update_account($_set: account_set_input, $where: account_bool_exp!) {
    update_account(where: $where, _set: $_set) {
      affected_rows
      returning {
        id
        username
      }
    }
  }
`;
const ACCOUNTS_DELETE = gql`
  mutation delete_account($where: account_bool_exp!) {
    delete_account(where: $where) {
      affected_rows
    }
  }
`;

export default {
  name: "Accounts",
  meta: {
    title: "Accounts"
  },
  components: { HasuraDatatable, TableCell },
  data() {
    return {
      gqlQueries: {
        query: ACCOUNTS_QUERY,
        aggregate: ACCOUNTS_AGGREGATE,
        update: ACCOUNT_UPDATE,
        delete: ACCOUNTS_DELETE
      }
    };
  },
  created() {
    this.$store.commit("appStore/setPageTitle", "Accounts");
    this.$store.commit("appStore/setPageName", "accounts");
  },
  computed: {
    pageSettings() {
      return this.$store.state.appStore.page.settings;
    }
  },
  methods: {
    finalProps(props) {
      const finalProps = clone(props);
      switch (finalProps.value) {
        case "ONLINE":
          finalProps.col.settings.color = "green";
          break;
        case "YV_SUSPENDED":
          finalProps.col.settings.color = "deep-orange";
          break;

        case "BLOCKED" || "SUSPENDED":
          finalProps.col.settings.color = "red";
          break;

        default:
          break;
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