<template>
  <q-select
    v-if="col.filter && col.filter.type === 'select'"
    v-model="model"
    filled
    :options="col.filter.options"
    :label="col.label"
    @input="$emit('input', model)"
  />
  <q-input
    v-else
    v-model="model"
    filled
    clearable
    :label="col.label"
    @input="$emit('input', model)"
  />
</template>

<script>
export default {
  name: "ColumnFilter",
  props: {
    value: {
      type: String
    },
    col: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      model: null
    };
  }
};
</script>
