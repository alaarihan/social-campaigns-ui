<template>
  <q-table
    style="height: calc(100vh - 85px);"
    class="sticky-header-table"
    :data="data"
    :columns="cols"
    :pagination.sync="pagination"
    :rows-per-page-options="[10, 20, 50, 100, 200, 500, 0]"
    row-key="id"
    flat
    bordered
    selection="multiple"
    :selected.sync="selected"
    ref="dataTable"
    @request="onRequest"
  >
    <template v-slot:header-cell-id="props">
      <q-th :props="props" auto-width class="th-id">
        {{ props.col.label }}
      </q-th>
    </template>
    <template v-slot:top-row="props">
      <q-tr>
        <q-td></q-td>
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
      <slot name="body-cell" :props="props">
        <table-cell :props="props"> </table-cell>
      </slot>
    </template>
  </q-table>
</template>

<script>
import clone from "clone";
import TableCell from "./TableCell";
import ColumnFilter from "./ColumnFilter";
export default {
  name: "HasuraDataTable",
  components: { TableCell, ColumnFilter },
  props: {
    cols: {
      type: Array,
      required: true
    },
    gqlQueries: {
      type: Object,
      required: true
    },
    modelName: {
      type: String,
      required: true
    }
  },
  apollo: {
    data: {
      query() {
        return this.gqlQueries.query;
      },
      update(data) {
        return data[this.modelName];
      },
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
    data_aggregate: {
      query() {
        return this.gqlQueries.aggregate;
      },
      update(data) {
        return data[`${this.modelName}_aggregate`];
      },
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
      colsFilters: {},
      selected: []
    };
  },
  watch: {
    data_aggregate(newVal, oldVal) {
      if (!this.data_aggregate) return;
      this.pagination.rowsNumber = this.data_aggregate.aggregate.count;
    }
  },
  created() {},
  computed: {
    activeFilters() {
      let activeFilter = {};
      let col;
      const filters = Object.entries(this.colsFilters).map(filter => {
        col = this.cols.find(col => col.field === filter[0]);

        if (!col) {
          col = this.cols.find(
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
