<template>
  <q-select
    v-if="filter && filter.type === 'select'"
    v-model="model"
    filled
    dense
    :options="col.filter.options"
    :label="label"
    emit-value
    map-options
    @input="$emit('input', model)"
  />
  <q-input
    v-else-if="filter && filter.type === 'number'"
    v-model.number="model"
    filled
    dense
    :label="label"
    type="number"
    :debounce="400"
    @input="$emit('input', model)"
  />
  <q-input
    v-else
    v-model="model"
    filled
    dense
    clearable
    :label="label"
    :debounce="400"
    @input="$emit('input', model)"
  />
</template>

<script>
export default {
  name: "ColumnFilter",
  props: {
    value: {
      type: [String, Number]
    },
    filter: {
      type: Object,
      required: true
    },
    col: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      model: null
    };
  },
  computed: {
    label() {
      if (this.filter.label) {
        return this.filter.label;
      }
      return this.col.label;
    }
  }
};
</script>
