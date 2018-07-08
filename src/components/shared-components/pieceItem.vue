<template>
  <div class="piece" 
    :style="{
      position: 'absolute',
      zIndex: zIndex,
      transform: 'translate(' + translateX + 'px,' + translateY + 'px)',
      width: width + 'px',
      height: width + 'px',
    }"
    @click="clickBindingEvent">
    <slot name="image"/>
  </div>
</template>

<script>
import Match from "@/components/shared-components/matchItem";

export default {
  extends: Match
};
</script>

<style lang="scss" scoped>
.piece {
  position: absolute;
  z-index: 9999;
  span {
    &:before {
      content: "";
      width: 60px;
      height: 60px;
      position: absolute;
      left: 0;
      border-radius: 50%;
      background-color: #000;
      z-index: 2;
    }
  }
}
</style>
