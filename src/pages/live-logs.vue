<template>
  <q-page class="fit row justify-center">
    <q-card class="col">
      <q-card-section>
        <q-table
          style="height: calc(100vh - 85px);"
          class="sticky-header-table"
          :data="log"
          :columns="this.$store.state.appStore.logs.columns"
          :pagination="{ rowsPerPage: 0 }"
          row-key="id"
          flat
          bordered
          virtual-scroll
          ref="logsTable"
        >
          <template v-slot:body-cell="props">
            <table-cell :props="finalProps(props)"> </table-cell>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import gql from "graphql-tag";
import clone from "clone";
import TableCell from "../components/TableCell";
const LOGS_QUERY = gql`
  query log($limit: Int, $where: log_bool_exp) {
    log(limit: $limit, where: $where, order_by: { id: desc }) {
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
export default {
  name: "Logs",
   meta: {
    title: 'Live Logs',
  },
  components: { TableCell },
  apollo: {
    log: {
      query: LOGS_QUERY,
      variables() {
        return {
          limit: 1
        };
      },
      subscribeToMore: {
        // GraphQL document
        document: gql`
          subscription log($limit: Int, $where: log_bool_exp) {
            log(limit: $limit, where: $where, order_by: { id: asc }) {
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
        `,
        // Variables passed to the subscription. Since we're using a function,
        // they are reactive
        variables() {
          return {
            limit: 100,
            where: { id: { _gt: this.cursor } }
          };
        },
        // Result hook
        updateQuery: function(previousResult, data) {
          return this.onLogAdded(previousResult, data);
        }
      }
    }
  },
  data() {
    return {};
  },
  watch: {},
  created() {
    this.$store.commit("appStore/setPageTitle", "Live Logs");
  },
  computed: {
    cursor() {
      if (this.log && this.log.length) {
        return this.log[this.log.length - 1].id;
      }
      return 0;
    }
  },
  methods: {
    onLogAdded(previousResult, { subscriptionData }) {
      console.log("called");
      if (this.cursor === 0) return;
      const newResult = {
        log: []
      };
      if (previousResult && previousResult.log) {
        newResult.log = [...previousResult.log];
      }
      if (newResult.log.length && subscriptionData.data.log.length) {
        const el = this.$refs.logsTable.$el.querySelector(".q-virtual-scroll");
        const scrolled = el.scrollTop + el.clientHeight + 1 < el.scrollHeight;
        newResult.log = [...newResult.log, ...subscriptionData.data.log];
        if (!scrolled) {
          setTimeout(() => {
            this.scrollToBottom(el, false);
          }, 1);
        }
      }
      return newResult;
    },
    scrollToBottom(el, smooth) {
      if (!el) return;
      if (typeof el.scroll === "function") {
        el.scroll({
          top: el.scrollHeight,
          behavior: smooth ? "smooth" : "instant"
        });
      } else {
        el.scrollTop = el.scrollHeight;
      }
    },
    finalProps(props) {
      const finalProps = clone(props);
      if (finalProps.col.type === "badge" && finalProps.value === "ERROR") {
        finalProps.col.settings.color = "red";
      }
      if (finalProps.col.type === "timeago") {
        finalProps.col.settings.autoUpdate = 5;
      }
      return finalProps;
    }
  }
};
</script>
