/**
 * 组件注册
 */

import Boxes from '@jyb/boxes';
import Index from './index.vue';

import schema from './schemas/config';
import configData from './schemas/config.json';
import packageJSON from './package.json';

export default Boxes.registerWidget(packageJSON.boxes.name, Index, {
  schema,
  config: configData
});
