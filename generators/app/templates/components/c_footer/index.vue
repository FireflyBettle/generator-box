<template>
  <div class="c-footer">
    <span class="title">{{$$config.content}}</span>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
@import "../../assets/sass/function";

.c-footer {
  padding: rem(30) 0;
  line-height: rem(36);
  text-align: center;

  .title {
    vertical-align: middle;
    font-size: rem(28);
    color: #fff;
  }
}
</style>