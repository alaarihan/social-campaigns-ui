<template>
  <q-popup-edit
    v-model="model"
    buttons
    separate-close-popup
    @save="$emit('input', model)"
  >
    <editor-field :col="col" v-model="model" :autofocus="true" />
  </q-popup-edit>
</template>

<script>
import EditorField from "./EditorField";
export default {
  name: "TableCellEditor",
  components: { EditorField },
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
  }
};
</script>
