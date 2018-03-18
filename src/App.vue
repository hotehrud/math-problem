<template>
  <div id="app">
    <sidebar/>

    <transition appear
      name="slide-fade"
      mode="out-in">>
      <router-view/>
    </transition>
  </div>
</template>

<script>
import sidebar from "@/components/sidebar";

export default {
  name: "app",
  components: {
    sidebar
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
  padding-top: 65px;
  height: 100%;
  @include respond-to($large-desktop) {
    padding-left: $sidebar-width;
  }
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
