/**
 * 活动配置
 */

import * as util from '@jyb/lib-util';

export default {
  // 默认从URL上面获取活动ID
  actID: decodeURIComponent(util.getQuery('act_id')) || '',
  // mock api
  mockAPI: 'http://mock.fe.jyb.com/mock-api/mock/5a73e010f6b8ef779d2e6e08',
  // app内红包
  hongbao: 'jtjr://coupon',
  // 我的收益
  myProfit: 'jtjr://myProfit',
  // 下载app
  appDown: 'https://deeplink.jyblife.com/d',
  // 外部打开app
  appScheme: 'jiayoubao://jtjr.jiayoubao/openwith',
  // icon
  jybIcon: 'https://cdn.jyblife.com/static/style/app/publish/img/nocard/logo.png',
  // 分享文案
  shareOptions: {
    title: 'h5活动模板',
    desc: 'h5活动模板'
  }
};
