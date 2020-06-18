<template>
  <q-page class="fit row justify-center">
    <q-card class="col">
      <q-card-section>
        <hasura-datatable
          :cols="$store.state.appStore.campaigns.columns"
          :gql-queries="gqlQueries"
          model-name="campaign"
          :show-filters="pageSettings.filters"
          :show-popup-editors="pageSettings.popupEditing"
          :show-top-actions="pageSettings.topActions"
          :show-row-actions="pageSettings.rowActions"
          @create="createItem"
        >
          <template v-slot:after-actions="{ props }">
            <q-btn round size="xs" color="primary" icon="settings">
              <q-menu auto-close>
                <q-list style="min-width: 100px">
                  <q-item clickable @click="startCampaign(props)">
                    <q-item-section>Start</q-item-section>
                  </q-item>
                  <q-separator />
                  <q-item clickable @click="cancelCampaign(props)">
                    <q-item-section>Cancel</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </template>
          <template v-slot:before-bulk-actions="{ props }">
            <q-btn
              color="primary"
              icon="send"
              label="Start"
              no-caps
              dense
              @click="startCampaigns(props)"
              class="q-mr-sm"
            />
            <q-btn
              color="primary"
              icon="pan_tool"
              label="Cancel"
              no-caps
              dense
              @click="cancelCampaigns(props)"
              class="q-mr-sm"
            />
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
      limited
      accounts_number
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
  components: { HasuraDatatable },
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
  mounted() {
    this.$store.commit("appStore/setActivePageName", "campaigns");
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
      this.$router.push("/campaigns/create");
    },
    startCampaign(props) {
      const id = props.row.id;
      const data = { status: "PENDING", progress: 0, repeated: 0 };
      this.updateCampaigns(id, data);
    },
    cancelCampaign(props) {
      const id = props.row.id;
      const data = { status: "CANCEL" };
      this.updateCampaigns(id, data);
    },
    startCampaigns(selected) {
      const ids = selected.map(item => item.id);
      const data = { status: "PENDING", progress: 0, repeated: 0 };
      this.updateCampaigns(ids, data);
    },
    cancelCampaigns(selected) {
      const ids = selected.map(item => item.id);
      const data = { status: "CANCEL" };
      this.updateCampaigns(ids, data);
    },
    updateCampaigns(id, data) {
      const op = id && Array.isArray(id) ? "_in" : "_eq";
      this.$apollo
        .mutate({
          // Query
          mutation: CAMPAIGN_UPDATE,
          // Parameters
          variables: {
            where: { id: { [op]: id } },
            _set: data
          }
        })
        .then(data => {
          // Result
          this.$store.dispatch("appStore/showNotifcation", {
            message: "Campaign updated successfully",
            type: "INFO"
          });
        })
        .catch(error => {
          // Error
          this.$store.dispatch("appStore/showNotifcation", {
            message: "Something wrong happened!",
            type: "ERROR"
          });
          console.error(error);
        });
    }
  }
};
</script>

<style>
.th-id {
  min-width: 150px;
}
</style>
