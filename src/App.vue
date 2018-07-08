<template>
  <div id="app">
    <sidebar
     :show="sideStatus">
     <ul>
       <li v-for="item in menuItems" @click="pageMove(item.requestURL)">
         <!-- <router-link :to="item.link">{{ item.name }}</router-link> -->
         {{ item.title }}
      </li>
     </ul>
    </sidebar>

    <div 
      class="container"
      @click="close">
      <toolbar/>

      <transition appear
        name="slide-fade"
        mode="out-in">>
        <router-view :key="routeStatus" />
      </transition>
    </div>
  </div>
</template>

<script>
// dev
if (require) {
  function importAll(r) {
    return r.keys().map(r);
  }
  importAll(require.context("./assets/images/", false, /\.(png|jpe?g|svg)$/));
}

import Vue from "vue";
import sidebar from "@/components/sidebar";
import toolbar from "@/components/toolbar";
import board from "@/components/shared-components/boardArea";
import { getJSON } from "@/js/request";

Vue.component("boardArea", board);

export default {
  name: "app",
  components: {
    sidebar,
    toolbar
  },
  data() {
    return {
      menuItems: []
      // menuItems: [
      //   {
      //     name: "문제",
      //     link: "problem-0"
      //   },
      //   {
      //     name: "B",
      //     link: "problem-1",
      //     n: 1
      //   },
      //   {
      //     name: "C",
      //     link: "problem-2",
      //     n: 2
      //   },
      //   {
      //     name: "D",
      //     link: "problem-3",
      //     n: 3
      //   },
      //   {
      //     name: "E",
      //     link: "problem-4",
      //     n: 4
      //   }
      // ]
    };
  },
  async created() {
    this.menuItems = await this.$http.getJSON("sub.json");

    // check, size of device
    this.$store.commit(
      "setSidebarStatus",
      window.innerWidth < 1200 ? false : true
    );
  },
  computed: {
    sideStatus() {
      return this.$store.getters.sidebarStatus;
    },
    routeStatus() {
      return this.$route.params.id;
    }
  },
  methods: {
    close() {
      if (this.sideStatus) {
        this.$store.commit("setSidebarStatus", false);
      }
    },
    pageMove(req) {
      this.$router.push({
        name: "problemList",
        params: {
          id: req
        }
      });
    }
  }
};
</script>

<style lang="scss">
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
body,
html {
  width: 100%;
  height: 100%;
}
html {
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 16px;
}
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #273238;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  background-color: $bg-color;
}
h1,
h2,
h3 {
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  margin: 0;
  opacity: 0.75;
}
h4,
h5,
h6,
span,
p,
:after,
:before {
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  margin: 0;
}
p {
  color: rgba(0, 0, 0, 0.65);
}
#app {
  height: 100%;
}
.layout {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 100%;
}
.header {
  width: 100%;
}
.body {
  padding: 1rem;
  @include respond-to($large-desktop) {
    padding: 2rem 1rem;
  }
}
.container {
  // padding-top: 65px;
  // height: 100%;
  // @include respond-to($large-desktop) {
  //   padding-left: $sidebar-width;
  // }
}
svg {
  top: auto;
  width: 1.5rem;
  height: 1.5rem;
}
ul {
  margin: 0;
  padding: 0;
}
a {
  color: inherit;
}
.transition {
  position: static !important;
}
.cursor {
  cursor: pointer;
}
.score {
  font-size: 0.75rem;
  text-align: right;
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-active {
  opacity: 0;
}
</style>
