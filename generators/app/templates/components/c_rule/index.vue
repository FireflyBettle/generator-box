<template>
  <a data-stat-ec="actRule" @click="showRule" class="c-rule" href="javascript:;">活动规则</a>
</template>
<script>
import Dialog from '@jyb/lib-dialog';
import * as helper from 'assets/js/helper';
import ruleTmpl from './rule.dot';

export default {
  methods: {
    createDialog() {
      if (this.dialog) return this.dialog;
      // const that = this;
      this.dialog = new Dialog({
        title: '活动规则', // 标题内容
        visible: false, // 默认显示
        showClose: false, // 是否显示close按钮
        content: ruleTmpl({ // 显示的内容
          $config: this.$$config
        }),
        mask: true, // 是否显示mask
        btns: [{
          text: '确定',
          callback: () => {
            this.dialog.close();
          }
        }]
      });
      // 加油宝对刷单套现等异常账户处理说明
      this.dialog.registerHandler('openServiceDetail', () => {
        helper.openUrl('https://cdn.jyblife.com/product/service/details/76a583cb03de40a2ba997b053dfa837be102c055.shtml');
      });
      return this.dialog;
    },
    showRule() {
      this.createDialog().show();
    }
  }
}
</script>
<style lang="scss">
@import "../../assets/sass/function";
.c-rule {
  position: absolute;
  top: 0;
  top: constant(safe-area-inset-top);
  top: env(safe-area-inset-top);
  right: rem(30);
  padding: rem(8) rem(12);
  background-color: #ffea59;
  font-size: rem(22);
  color: #f86a49;
  border-bottom-left-radius: rem(8);
  border-bottom-right-radius: rem(8);
}

.rule-tips {
  font-size: rem(22);
  color: #ff4500;
}
</style>