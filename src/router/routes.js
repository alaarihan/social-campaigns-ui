const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "live-logs", component: () => import("pages/live-logs.vue") }
    ]
  },
  {
    path: "/",
    component: () => import("layouts/DataTable.vue"),
    children: [{ path: "logs", component: () => import("pages/logs.vue") }]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
