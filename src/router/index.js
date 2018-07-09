import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/home";
import ProblemList from "@/views/ProblemList";
import Problem from "@/views/Problem";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      name: "home",
      path: "/",
      component: Home
    },
    {
      name: "problemList",
      path: "/list",
      component: ProblemList,
      props: route => ({
        uid: route.query.id
      })
    },
    {
      name: "problem",
      path: "/problem",
      component: Problem,
      props: route => ({
        uid: route.query.id
      })
    }
  ],
  mode: "history"
});

function hasQueryParams(route) {
  return !!Object.keys(route.query).length;
}

router.beforeEach((to, from, next) => {
  if (to.name === "home") {
    next();
  } else {
    if (!hasQueryParams(to)) {
      next("/");
    } else {
      next();
    }
  }
});

export default router;
