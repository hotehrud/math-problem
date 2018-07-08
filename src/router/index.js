import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/home";
import ProblemList from "@/views/ProblemList";
import Problem from "@/views/Problem";

Vue.use(Router);

export default new Router({
  routes: [
    {
      name: "home",
      path: "/",
      component: Home
    },
    {
      name: "problemList",
      path: "/problem",
      component: ProblemList,
      beforeEnter(to, from, next) {
        if (!to.params.id) {
          next("/");
        } else {
          next();
        }
      }
    },
    {
      name: "problem",
      path: "/problem/:id",
      component: Problem
    }
  ],
  mode: "history"
});
