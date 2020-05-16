<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title>
          <slot name="page-title">
            {{ $store.state.appStore.page.title }}
          </slot>
        </q-toolbar-title>
        <slot name="page-menu"> </slot>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      overlay
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Menu
        </q-item-label>
        <q-item
          v-for="link in menuLinks"
          :key="link.title"
          clickable
          v-ripple
          :to="link.link"
        >
          <q-item-section avatar>
            <q-icon color="primary" :name="link.icon" />
          </q-item-section>

          <q-item-section>{{ link.title }}</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <slot name="router">
        <router-view />
      </slot>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  meta: {
    titleTemplate: title => `${title} - Social Campaigns`
  },
  data() {
    return {
      leftDrawerOpen: false,
      menuLinks: [
        {
          title: "Home",
          caption: "home",
          icon: "home",
          link: "/#"
        },
        {
          title: "Accounts",
          caption: "accounts",
          icon: "people",
          link: "/accounts"
        },
        {
          title: "Live Logs",
          caption: "live-logs",
          icon: "history",
          link: "/live-logs"
        },
        {
          title: "Logs",
          caption: "logs",
          icon: "history",
          link: "/logs"
        }
      ]
    };
  }
};
</script>
