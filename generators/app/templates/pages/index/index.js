/**
 * 主页
 */

// tracker&&bimta，如果不需要上报可以去掉
import 'config/tracker';
import 'config/report';
import Vue from 'vue';
import Boxes from '@jyb/boxes';
import BoxesViewVue from '@jyb/boxes-view-vue';
import * as bimtaHelper from "@/assets/js/bimta_helper";
import attachFastClick from '@jyb/lib-fastclick';
import bimta from "@/config/report";

// component
import '@/components/c_header/index';
import '@/components/c_rule/index';
import '@/components/c_list/index';
import '@/components/c_footer/index';

import pageData from './page.json';
import './index.scss';

Boxes.$bimta = bimtaHelper.hook(bimta);

Boxes.setGlobalConfig({
  debug: process.env.NODE_ENV !== 'production'
});

Boxes.on('mounted', () => {
  // do something...
  // Boxes.$bimta.$reportEvent("actRule", { rewardId: item.rewardId });
});

Boxes.on('CompList:baina', (id) => {
  console.log(id);
});

Boxes.registerViewEngine('vue', BoxesViewVue);
Boxes.useViewEngine('vue', {
  constructor: Vue
});
Boxes.mount('#app', pageData);
attachFastClick.attach(document.body);
