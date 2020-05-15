<template>
  <q-td :props="props">
    <timeago
      v-if="props.col.type === 'timeago'"
      :datetime="props.value"
      :auto-update="props.col.settings.autoUpdate"
    />
    <q-badge
      v-else-if="props.col.type === 'badge'"
      :color="props.col.settings.color"
    >
      {{ props.value }}
    </q-badge>
    <template v-else>
      {{ props.value }}
    </template>
    <table-cell-editor
      v-if="showEditor && props.col.editor !== false"
      v-model="model"
      :col="props.col"
      @input="$emit('input', model)"
    />
  </q-td>
</template>

<script>
import TableCellEditor from "./TableCellEditor";
export default {
  name: "TableCell",
  components: { TableCellEditor },
  data() {
    return {
      model: null
    };
  },
  props: {
    value: {
      type: null
    },
    props: {
      type: Object,
      required: true
    },
    showEditor: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  created() {
    this.model = this.value;
  }
};
</script>
