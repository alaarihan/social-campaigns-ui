const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import("pages/Index.vue") },
      { path: "/live-logs", component: () => import("pages/live-logs.vue") },
      { path: "/:type/create", component: () => import("pages/_type/create.vue") }
    ]
  },
  {
    path: "/",
    component: () => import("layouts/DataTable.vue"),
    children: [
      { path: "/accounts", component: () => import("pages/accounts.vue") },
      { path: "/campaigns", component: () => import("pages/campaigns.vue") },
      { path: "/logs", component: () => import("pages/logs.vue") }
    ]
  },
  {
    path: "/auth/",
    component: () => import("layouts/login.vue"),
    children: [{ path: "login", component: () => import("pages/login.vue") }]
  }
];

/// Always leave this as last one
routes.push({
  path: '*',
  component: () => import('pages/Error404.vue')
})

export default routes;
