<template>
  <div>
    <q-select
      v-if="col.editor && col.editor.type === 'select'"
      v-model="model"
      :dense="dense"
      :autofocus="autofocus"
      :options="col.editor.options"
      :label="label"
      emit-value
      map-options
    />
    <q-input
      v-else-if="col.editor && col.editor.type === 'number'"
      v-model.number="model"
      :dense="dense"
      :autofocus="autofocus"
      clearable
      :label="label"
      type="number"
    />
    <q-input
      v-else-if="col.editor && col.editor.type === 'textarea'"
      v-model="model"
      :dense="dense"
      :autofocus="autofocus"
      clearable
      :label="label"
      type="textarea"
    />
    <q-input
      v-else
      v-model="model"
      :dense="dense"
      :autofocus="autofocus"
      :label="label"
      clearable
    />
  </div>
</template>

<script>
export default {
  name: "EditorField",
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
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    model(newVal, oldVal) {
      if (newVal === oldVal) return;
      this.$emit("input", newVal);
    }
  },
  created() {
    this.model = this.value;
  },
  computed: {
    label() {
      // if (this.col.editor.label) {
      //   return this.col.editor.label;
      // }
      return this.col.label;
    }
  }
};
</script>
