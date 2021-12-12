/**
 * 发送请求
 */

import tips from '@jyb/lib-tips';
import * as util from '@jyb/lib-util';
import BaseRequest from '@jyb/lib-request';
import * as helper from 'assets/js/helper';
import actConfig from 'config/index';

const userid = util.getQuery('userid') || '';
const token = util.getQuery('token') || '';
const visit = util.getQuery('visit') || '';
const baseRequest = new BaseRequest();

if (userid && token) {
  util.setCookie('userid', userid, 10);
  util.setCookie('token', token, 10);
}

const defaultPathName = '/act/index';
const hostEnv = {
  mock: actConfig.mockAPI,
  local: '/proxy',
  test: `${(window.interface_env || 'https://swebsit.jyblife.com')}`,
  production: `${(window.interface_env || 'https://sweb.jyblife.com')}`
};

class Request {
  constructor() {
    this.currentHost = hostEnv[process.env.NODE_ENV];
    this.interceptors = {
      request: [],
      response: []
    };
  }
  useInterceptors(name, handler) {
    if (Object.prototype.hasOwnProperty.call(this.interceptors, name) && typeof handler === 'function') {
      this.interceptors[name].push(handler);
    }
  }
  executeInterceptors(name, data) {
    if (Object.prototype.hasOwnProperty.call(this.interceptors, name)) {
      const handler = this.interceptors[name];
      for (let i = 0, l = handler.length; i < l; i++) {
        const currentHandler = handler[i];
        if (currentHandler(data) === false) return false;
        data = currentHandler(data);
      }
      return data;
    }
  }
  post(url, data) {
    if (typeof url === 'object') {
      data = url;
      url = defaultPathName;
    }

    // 使用副本
    if (visit === 'copy') {
      data.visit = visit;
    }

    if (typeof data.userStatus === 'undefined' || data.userStatus === true) {
      const userInfo = helper.getUserInfo();
      data.userid = userInfo.userid;
      data.token = userInfo.token;
    }

    if (!data.hideLoading) {
      tips.showLoading();
    }

    delete data.userStatus;
    delete data.hideLoading;

    // 请求参数
    const reqQuery = {
      ts: Date.now()
    };
    // mock环境
    if (process.env.NODE_ENV === 'mock') {
      reqQuery._mockPostFix = '1';
    }

    const reqQueryStr = baseRequest.qs.stringify(reqQuery);
    data = this.executeInterceptors('request', data) || data;
    return new Promise((resolve, reject) => {
      baseRequest.ajax({
        url: this.currentHost + url + (reqQueryStr ? `?${reqQueryStr}` : ''),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data,
        method: 'post',
        timeout: 60000
      }).then((json) => {
        tips.closeTips();
        const res = this.executeInterceptors('response', json);
        if (res === false) return;
        resolve(json);
      }).catch((e) => {
        reject(e);
        tips.closeTips();
        if (e.code >= 500) tips.showError(`网络错误<br/>错误码${e.code}`);
      });
    });
  }
}

export default Request;
