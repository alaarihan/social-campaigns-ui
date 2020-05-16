<template>
  <q-page class="fit row justify-center">
    <q-card class="col">
      <q-card-section>
        <hasura-datatable
          :cols="$store.state.appStore.campaigns.columns"
          :gql-queries="gqlQueries"
          model-name="campaign"
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
const CAMPAIGNS_QUERY = gql`
  query campaign(
    $limit: Int
    $where: campaign_bool_exp
    $order_by: [campaign_order_by!]
    $offset: Int
  ) {
    campaign(
      limit: $limit
      where: $where
      order_by: $order_by
      offset: $offset
    ) {
      id
      name
      type
      target
      status
      progress
      link
      cost_per_one
      repeat
      repeated
      overwrite
      created_at
      updated_at
    }
  }
`;
const CAMPAIGNS_AGGREGATE = gql`
  query campaign_aggregate($where: campaign_bool_exp) {
    campaign_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
const CAMPAIGN_UPDATE = gql`
  mutation update_campaign(
    $_set: campaign_set_input
    $where: campaign_bool_exp!
  ) {
    update_campaign(where: $where, _set: $_set) {
      affected_rows
      returning {
        id
        message
      }
    }
  }
`;
const CAMPAIGNS_DELETE = gql`
  mutation delete_campaign($where: campaign_bool_exp!) {
    delete_campaign(where: $where) {
      affected_rows
    }
  }
`;

export default {
  name: "Campaigns",
  meta: {
    title: "Campaigns"
  },
  components: { HasuraDatatable, TableCell },
  data() {
    return {
      gqlQueries: {
        query: CAMPAIGNS_QUERY,
        aggregate: CAMPAIGNS_AGGREGATE,
        update: CAMPAIGN_UPDATE,
        delete: CAMPAIGNS_DELETE
      }
    };
  },
  created() {
    this.$store.commit("appStore/setPageTitle", "Campaigns");
    this.$store.commit("appStore/setPageName", "campaigns");
  },
  computed: {
    pageSettings() {
      return this.$store.state.appStore.page.settings;
    }
  },
  methods: {
    finalProps(props) {
      const finalProps = clone(props);
      if (finalProps.value === "ACTIVE") {
        finalProps.col.settings.color = "green";
      } else if (finalProps.value === "COMPLETED") {
        finalProps.col.settings.color = "blue";
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
