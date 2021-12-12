/**
 * 业务数据上报
 * @see http://doc.fe.jyb.com/book/common-lib/packages/lib-bimta/
 */

import Bimta from '@jyb/lib-bimta';
import actConfig from './index';
import globalVar from "config/global_var";

window.Bimta || (window.Bimta = Bimta);
const configMap = {
  h5act: {
    id: '10000',
    index: { // 活动主页
      id: '1',
      pv: { // 活动主页-页面载入
        id: '1'
      },
      actRule: { // 活动主页-活动规则
        id: '2'
      }
    }
  }
};

const prodEnv = globalVar.isProd;
const bimta = new Bimta({
  configMap,
  platform: prodEnv ? ['bi', 'mta'] : [],
  debug: !prodEnv,
  env: prodEnv ? 'prod' : 'test',
  createCommonParams() {
    return { act_id: actConfig.actID };
  }
});

bimta.start();

export default bimta;
