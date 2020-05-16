<template>
  <main-layout>
    <template v-slot:router>
      <router-view />
    </template>
    <template v-slot:page-menu>
      <q-btn flat dense round icon="settings" aria-label="Menu">
        <q-menu persistent>
          <q-splitter
            v-model="splitterModel"
            style="height: 350px; min-width: 600px;"
          >
            <template v-slot:before>
              <q-tabs v-model="tab" vertical class="text-teal">
                <q-tab name="options" icon="tune" label="Options" />
                <q-tab name="columns" icon="view_column" label="Columns" />
              </q-tabs>
            </template>

            <template v-slot:after>
              <q-tab-panels
                v-model="tab"
                animated
                swipeable
                vertical
                transition-prev="jump-up"
                transition-next="jump-up"
              >
                <q-tab-panel name="options">
                  <div class="text-h4 q-mb-md">Options</div>
                  <div class="q-pa-md q-gutter-y-sm column">
                    <q-toggle
                      v-model="popupEditing"
                      label="Enable popup editing"
                    />
                    <q-toggle
                      v-model="filters"
                      label="Show filters"
                    />
                    <q-toggle v-model="rowActions" label="Enable Row Actions" />
                    <q-toggle
                      v-model="bulkActions"
                      label="Enable Bulk Actions"
                    />
                  </div>
                </q-tab-panel>

                <q-tab-panel name="columns">
                  <div class="text-h4 q-mb-md">Columns</div>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Quis praesentium cumque magnam odio iure quidem, quod illum
                    numquam possimus obcaecati commodi minima assumenda
                    consectetur culpa fuga nulla ullam. In, libero.
                  </p>
                </q-tab-panel>
              </q-tab-panels>
            </template>
          </q-splitter>
        </q-menu>
      </q-btn>
    </template>
  </main-layout>
</template>

<script>
import MainLayout from "./MainLayout";
export default {
  name: "DataTableLayout",
  components: { MainLayout },
  data() {
    return {
      tab: "options",
      splitterModel: 30
    };
  },
  computed: {
    pageSettings(){
      return this.$store.state.appStore.page.settings
    },
    popupEditing: {
      get() {
        return this.pageSettings.popupEditing;
      },
      set(val) {
        this.$store.commit("appStore/setSetting", {
          setting: "popupEditing",
          value: val
        });
      }
    },
     filters: {
      get() {
        return this.pageSettings.filters;
      },
      set(val) {
        this.$store.commit("appStore/setSetting", {
          setting: "filters",
          value: val
        });
      }
    },
    bulkActions: {
      get() {
        return this.pageSettings.bulkActions;
      },
      set(val) {
        this.$store.commit("appStore/setSetting", {
          setting: "bulkActions",
          value: val
        });
      }
    },
    rowActions: {
      get() {
        return this.pageSettings.rowActions;
      },
      set(val) {
        this.$store.commit("appStore/setSetting", {
          setting: "rowActions",
          value: val
        });
      }
    }
  }
};
</script>
