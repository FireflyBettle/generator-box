<template>
  <div class="c-header">
    <img :src="$$config.bannerImg || bannerImg" alt="">
  </div>
</template>
<script>
// img
import bannerImg from './img/banner.png';

export default {
  data() {
    return {
      bannerImg
    };
  }
}
</script>
<style lang="scss">
@import "../../assets/sass/function";

.c-header {
  width: 100%;

  img {
    width: 100%;
  }
}
</style>