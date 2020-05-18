<template>
  <q-popup-edit v-model="model" buttons separate-close-popup @save="$emit('input', model)">
    <q-select
      v-if="col.editor && col.editor.type === 'select'"
      v-model="model"
      dense
      autofocus
      :options="col.editor.options"
      :label="label"
      emit-value
      map-options
    />
    <q-input
      v-else-if="col.editor && col.editor.type === 'number'"
      v-model.number="model"
      dense
      autofocus
      clearable
      :label="label"
      type="number"
    />
    <q-input
      v-else-if="col.editor && col.editor.type === 'textarea'"
      v-model="model"
      dense
      autofocus
      clearable
      :label="label"
      type="textarea"
    />
    <q-input v-else v-model="model" dense autofocus clearable />
  </q-popup-edit>
</template>

<script>
export default {
  name: "TableCellEditor",
  data() {
    return {
      model: null
    };
  },
  props: {
    value: {
      type: null
    },
    col: {
      type: Object
    }
  },
  created() {
    this.model = this.value;
  },
  computed: {
    label() {
      if (this.col.editor.label) {
        return this.col.editor.label;
      }
      return this.col.label;
    }
  }
};
</script>
