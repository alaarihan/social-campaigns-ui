<template>
  <q-page class="fit row justify-center">
    <q-card class="col">
      <q-card-section>
        <q-table
          style="height: calc(100vh - 85px);"
          class="sticky-header-table"
          :data="log"
          :columns="this.$store.state.appStore.logs.columns"
          :pagination.sync="pagination"
          :rows-per-page-options="[10, 20, 50, 100, 200, 500, 0]"
          row-key="id"
          flat
          bordered
          ref="logsTable"
          @request="onRequest"
        >
        <!-- <template v-slot:top-row="props">
            <div>Here it is</div>
        </template> -->
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
  query log($limit: Int, $where: log_bool_exp, $order_by: [log_order_by!], $offset: Int) {
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
export default {
  name: "Logs",
  components: { TableCell },
  apollo: {
    log: {
      query: LOGS_QUERY,
      variables() {
        return {
          limit: this.pagination.rowsPerPage,
          offset: this.pagination.rowsPerPage * (this.pagination.page - 1),
          order_by: this.pagination.sortBy
            ? {
                [this.pagination.sortBy]: this.pagination.descending
                  ? "desc"
                  : "asc"
              }
            : { id: "desc" }
        };
      }
    },
    log_aggregate: {
      query: gql`
        query log_aggregate {
          log_aggregate {
            aggregate {
              count
            }
          }
        }
      `
    }
  },
  data() {
    return {
      pagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 20,
        rowsNumber: 0
      }
    };
  },
  watch: {
    log_aggregate(newVal, oldVal){
      if(!this.log_aggregate) return;
      this.pagination.rowsNumber = this.log_aggregate.aggregate.count;
    }
  },
  created() {
  },
  computed: {
  },
  methods: {
    finalProps(props) {
      const finalProps = clone(props);
      if (finalProps.col.type === "badge" && finalProps.value === "ERROR") {
        finalProps.col.settings.color = "red";
      }
      return finalProps;
    },
    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      this.pagination = props.pagination;
    }
  }
};
</script>
