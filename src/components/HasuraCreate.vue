<template>
  <div class="fit row justify-center ">
    <q-form @submit="onSubmit" class="col" style="max-width: 700px">
      <template v-for="col in cols">
        <editor-field
          v-if="!col.notEditable && !notEditableFields.includes(col.field)"
          v-model="newItem[col.field]"
          :col="col"
          :key="col.name"
          :dense="false"
          class="q-mb-md"
        />
      </template>
      <div class="q-mt-lg">
        <q-btn label="Create" type="submit" color="primary"/>
        <q-btn label="Create & Stay" @click="onSubmitStay"  class="q-ml-sm" />
        <q-btn label="Cancel" color="primary" flat class="q-ml-sm" @click="cancel" />
      </div>
    </q-form>
  </div>
</template>

<script>
import clone from "clone";
import EditorField from "./EditorField";
export default {
  name: "HasuraDataTable",
  components: { EditorField },
  props: {
    cols: {
      type: Array,
      required: true
    },
    createQuery: {
      type: null,
      required: true
    },
    modelName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      newItem: {},
      notEditableFields: ['id', 'created_at', 'updated_at']
    };
  },
  created() {},
  computed: {},
  methods: {
    async createItem() {
      return await this.$apollo
        .mutate({
          // Query
          mutation: this.createQuery,
          // Parameters
          variables: {
            object: this.newItem
          }
        })
        .then(res => {
          // Result
          this.$store.dispatch("appStore/showNotifcation", {
            message: "Created successfully",
            type: "INFO"
          });
          return res.data
        })
        .catch(error => {
          // Error
          console.error(error);
          this.$store.dispatch("appStore/showNotifcation", {
            message: `Not created!, something wrong happened!, ${error.message}`,
            type: "ERROR"
          });
        });
    },
    async onSubmit() {
      const results = await this.createItem()
      if(results){
        this.$emit('created', results)
        this.newItem = {};
      }
    },
    async onSubmitStay() {
      this.createItem()
    },
    cancel() {
      this.newItem = {};
      this.$emit('canceled', true)
    }
  }
};
</script>

<style scoped></style>
