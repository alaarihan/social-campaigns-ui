<template>
  <q-page class="fit row justify-center">
    <q-card class="col">
      <q-card-section>
        <q-table
          style="height: calc(100vh - 85px);"
          class="sticky-header-table"
          :data="log"
          :columns="$store.state.appStore.logs.columns"
          :pagination.sync="pagination"
          :rows-per-page-options="[10, 20, 50, 100, 200, 500, 0]"
          row-key="id"
          flat
          bordered
          ref="logsTable"
          @request="onRequest"
        >
          <template v-slot:header-cell-id="props">
            <q-th :props="props" auto-width class="th-id">
              {{ props.col.label }}
            </q-th>
          </template>
          <template v-slot:top-row="props">
            <q-tr>
              <q-td v-for="col in props.cols" :key="col.name">
                <column-filter
                  v-if="col.filter && !Array.isArray(col.filter)"
                  :col="col"
                  :filter="col.filter"
                  v-model="colsFilters[col.field]"
                />
                <div
                  v-else-if="col.filter && Array.isArray(col.filter)"
                  class="row no-wrap q-gutter-md"
                >
                  <div v-for="filter in col.filter" :key="filter.id">
                    <column-filter
                      :col="col"
                      :filter="filter"
                      v-model="colsFilters[filter.id]"
                    />
                  </div>
                </div>
              </q-td>
            </q-tr>
          </template>
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
import ColumnFilter from "../components/ColumnFilter";
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
export default {
  name: "Logs",
  components: { TableCell, ColumnFilter },
  apollo: {
    log: {
      query: LOGS_QUERY,
      variables() {
        return {
          limit: this.pagination.rowsPerPage,
          offset: this.pagination.rowsPerPage * (this.pagination.page - 1),
          where: this.activeFilters ? this.activeFilters : null,
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
        query log_aggregate($where: log_bool_exp) {
          log_aggregate(where: $where) {
            aggregate {
              count
            }
          }
        }
      `,
      variables() {
        return {
          where: this.activeFilters ? this.activeFilters : null
        };
      }
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
      },
      colsFilters: {}
    };
  },
  watch: {
    log_aggregate(newVal, oldVal) {
      if (!this.log_aggregate) return;
      this.pagination.rowsNumber = this.log_aggregate.aggregate.count;
    }
  },
  created() {},
  computed: {
    activeFilters() {
      let activeFilter = {};
      let col;
      const filters = Object.entries(this.colsFilters).map(filter => {
        col = this.$store.state.appStore.logs.columns.find(
          col => col.field === filter[0]
        );

        if (!col) {
          col = this.$store.state.appStore.logs.columns.find(
            col =>
              Array.isArray(col.filter) &&
              col.filter.find(subFilter => subFilter.id === filter[0])
          );

          if (col) {
            col = { ...col };
            col.filter = col.filter.find(f => f.id === filter[0]);
          }
        }
        const op = col.filter.op ? col.filter.op : "_eq";
        if (filter[1]) {
          if (!activeFilter[col.field]) {
            activeFilter[col.field] = {};
          }
          activeFilter[col.field][op] =
            op === "_ilike" ? `%${filter[1]}%` : filter[1];
        }

        return { [col.field]: { [op]: filter[1] ? filter[1] : null } };
      });
      return activeFilter;
    }
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

<style>
.th-id {
  min-width: 150px;
}
</style>
