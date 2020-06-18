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
    <template v-if="showTopActions" v-slot:top>
      <div>
        <slot name="top-actions">
          <slot name="before-top-actions" :props="selected"> </slot>
          <q-btn
            color="primary"
            icon="create"
            label="Create"
            no-caps
            dense
            @click="createItem"
            class="q-mr-sm"
          />
          <slot name="after-top-actions" :props="selected"> </slot>
          <slot
            name="bulkActions"
            v-if="selected && selected.length"
          >
            <slot name="before-bulk-actions" :props="selected"> </slot>
            <q-btn
              color="red"
              icon="delete"
              label="Delete"
              no-caps
              dense
              @click="confirmDelete('selected', null)"
              class="q-mr-sm"
            />
            <slot name="after-bulk-actions" :props="selected"> </slot>
          </slot>
        </slot>
      </div>
    </template>
    <template v-slot:header-cell-id="props">
      <q-th :props="props" auto-width class="th-id">
        {{ props.col.label }}
      </q-th>
    </template>
    <template v-if="showFilters" v-slot:top-row="props">
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
                class="number-filter-input"
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
        <q-td
          v-if="showRowActions && props.col.type === 'actions'"
          :props="props"
        >
          <slot name="actions" :props="props">
            <slot name="before-actions" :props="props"> </slot>
            <q-btn
              v-if="props.col.actions && props.col.actions.includes('delete')"
              round
              size="xs"
              color="red"
              icon="delete"
              @click="confirmDelete('single', props.row.id)"
            >
              <q-tooltip self="center middle" anchor="top middle"
                >Delete</q-tooltip
              >
            </q-btn>
            <slot name="after-actions" :props="props"> </slot>
          </slot>
        </q-td>
        <table-cell
          v-else
          :props="props"
          :show-editor="showPopupEditors"
          v-model="props.row[props.col.field]"
          @input="onCellValueChange($event, props)"
        >
        </table-cell>
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
    },
    showFilters: {
      type: Boolean,
      default: true,
      required: false
    },
    showPopupEditors: {
      type: Boolean,
      default: true,
      required: false
    },
    showRowActions: {
      type: Boolean,
      default: true,
      required: false
    },
    showTopActions: {
      type: Boolean,
      default: true,
      required: false
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
      selected: [],
      editedItem: {}
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
        if (this.colsFilters[filter[0]]) {
          if (!activeFilter[col.field]) {
            activeFilter[col.field] = {};
          }
          activeFilter[col.field][op] =
            op === "_ilike"
              ? `%${this.colsFilters[filter[0]]}%`
              : this.colsFilters[filter[0]];
        }

        return {
          [col.field]: {
            [op]: this.colsFilters[filter[0]]
              ? this.colsFilters[filter[0]]
              : null
          }
        };
      });
      return activeFilter;
    }
  },
  methods: {
    onRequest(props) {
      const { page, rowsPerPage, sortBy, descending } = props.pagination;
      this.pagination = props.pagination;
    },
    createItem() {
      this.$emit("create", true);
    },
    onCellValueChange(event, props) {
      console.log(event, props);
      this.updateField(props.row.id, props.col.field, event);
    },
    updateField(id, key, value) {
      this.$apollo
        .mutate({
          // Query
          mutation: this.gqlQueries.update,
          // Parameters
          variables: {
            where: { id: { _eq: id } },
            _set: { [key]: value }
          }
        })
        .then(data => {
          // Result
          this.$store.dispatch("appStore/showNotifcation", {
            message: "Updated successfully",
            type: "INFO"
          });
          this.$apollo.queries.data.refetch();
        })
        .catch(error => {
          // Error
          console.error(error);
          this.$store.dispatch("appStore/showNotifcation", {
            message: `Something wrong happened!, ${error.message}`,
            type: "ERROR"
          });
        });
    },
    confirmDelete(mode, id) {
      let message, action;
      if (mode === "selected") {
        message = "Are you sure you want to delete selected items?";
      } else {
        message = "Are you sure you want to delete this item?";
      }
      this.$q
        .dialog({
          title: "Delete",
          message,
          cancel: true,
          persistent: false
        })
        .onOk(() => {
          if (mode === "selected") {
            this.deleteSelected();
          } else {
            this.deleteItem(id);
          }
        })
        .onCancel(() => {})
        .onDismiss(() => {});
    },
    deleteItem(id) {
      this.$apollo
        .mutate({
          // Query
          mutation: this.gqlQueries.delete,
          // Parameters
          variables: {
            where: { id: { _eq: id } }
          }
        })
        .then(data => {
          // Result
          this.$store.dispatch("appStore/showNotifcation", {
            message: "Deleted successfully",
            type: "INFO"
          });
          this.$apollo.queries.data.refetch();
          this.selected = [];
        })
        .catch(error => {
          // Error
          console.error(error);
          this.$store.dispatch("appStore/showNotifcation", {
            message: `Something wrong happened!, ${error.message}`,
            type: "ERROR"
          });
        });
    },
    deleteItems(ids) {
      this.$apollo
        .mutate({
          // Query
          mutation: this.gqlQueries.delete,
          // Parameters
          variables: {
            where: { id: { _in: ids } }
          }
        })
        .then(data => {
          // Result
          const deletedItemsNumber =
            data.data[`delete_${this.modelName}`].affected_rows;
          this.$store.dispatch("appStore/showNotifcation", {
            message: `${deletedItemsNumber} items deleted successfully`,
            type: "INFO"
          });
          this.$apollo.queries.data.refetch();
          this.selected = [];
        })
        .catch(error => {
          this.$store.dispatch("appStore/showNotifcation", {
            message: `Something wrong happened!, ${error.message}`,
            type: "ERROR"
          });
          // Error
          console.error(error);
        });
    },
    deleteSelected() {
      if (this.selected.length) {
        const ids = this.selected.map(row => row.id);
        this.deleteItems(ids);
      }
    }
  }
};
</script>

<style scoped>
.th-id {
  min-width: 150px;
}
.number-filter-input {
  min-width: 60px;
}
</style>
