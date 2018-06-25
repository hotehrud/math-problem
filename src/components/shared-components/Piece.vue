<template>
  <div class="match" 
    :style="{
      position: 'absolute',
      zIndex: 9999,
      transform: 'translate(' + translateX + 'px,' + translateY + 'px)',
      width: width + 'px',
      height: width + 'px',
      backgroundColor: 'blue'
    }"
    @click="clickBindingEvent">
  </div>
</template>

<script>
import Match from "@/components/shared-components/Match";

export default {
  extends: Match
};
</script>

<style lang="scss" scoped>
.match {
  position: absolute;
  z-index: 9999;
  background-color: #ffdd73;
}
</style>
