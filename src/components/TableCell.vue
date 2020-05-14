<template>
  <q-td :props="props">
    <timeago v-if="props.col.type === 'timeago'" :datetime="props.value" :auto-update="props.col.settings.autoUpdate" />
    <q-badge
      v-else-if="props.col.type === 'badge'"
      :color="props.col.settings.color"
    >
      {{ props.value }}
    </q-badge>
    <template v-else>
      {{ props.value }}
    </template>
  </q-td>
</template>

<script>
export default {
  name: "TableCell",
  props: {
    props: {
      type: Object,
      required: true
    }
  }
};
</script>
