/**
 * indexService
 */

import extend from '@jyb/lib-extend';
import detect from '@jyb/lib-detect';
import * as helper from '@/assets/js/helper';
import actConfig from '@/config/index';
import isNotLogin from '@/assets/js/is_not_login';
import Request from './request';

const env = detect();
const request = new Request();

// 公共参数
const commonParams = {
  act_id: actConfig.actID,
  from: env.jyb ? 'app' : 'h5'
};
let isNotLoginLock = false;

request.useInterceptors('request', data => extend({}, commonParams, data));
request.useInterceptors('response', (json) => {
  // 如果没登录
  if (isNotLogin(json.code) && !isNotLoginLock) {
    isNotLoginLock = true;
    helper.callLogin();
    return false;
  }
});

/**
 * 获取列表
 * @param {Object} data
 */
export function fetchList(data = {}) {
  return request.post('/act/index', extend({
    cmd: '40020303'
  }, data));
}

export function getDetail() {

}
