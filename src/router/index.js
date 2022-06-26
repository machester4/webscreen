import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: "/remote/:code",
      name: "Remote",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "remote" */ "../views/Remote.vue"),
    },
  ],
});

export default router;
