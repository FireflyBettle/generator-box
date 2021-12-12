/**
 * helper
 */

import qs from 'qs';
import * as util from '@jyb/lib-util';
import extend from '@jyb/lib-extend';
import OpenInstall from '@jyb/lib-open-install';
import globalVar from 'config/global_var';
import commonUrlInfo from '@/config/url_info';
import actConfig from '@/config/index';
import currentEnv from './env';

const nodeEnvStr = process.env.NODE_ENV;
const isLocalOrMock = nodeEnvStr === 'local' || nodeEnvStr === 'mock';
// 提前初始化，再赋值
const openInstall = new OpenInstall();

// 链接识别
const URL_IDENTIFY_REGULAR = {
  JTJR: /^jtjr:\/\//, // app内部地址 jtjr://???
  COMPLETE: /:\/\//, // 活动外部地址完整
  SNIPPETS: /^\//, // 活动外部地址片段 /product/baina/detail.html
};

// 获取加油宝客户端版本
export function getJybClientInfo() {
  const m = window.navigator.userAgent.match(/jiayoubao[^\d]*(\d+\.\d+\.\d+)/);
  return {
    jyb: !!m,
    version: m ? m[1] : '',
  };
}

export function getUserInfo() {
  return {
    userid: util.getQuery('userid') || util.getCookie('userid') || '',
    token: util.getQuery('token') || util.getCookie('token') || '',
  };
}

/**
 * 登出
 */
export function setLogout() {
  util.delCookie('userid');
  util.delCookie('token');
}

/**
 * 清除APP登录状态
 */
export function clearAppLoginStatus() {
  if (
    currentEnv.jyb &&
    util.getQuery('timestamp') &&
    (!util.getQuery('userid') || !util.getQuery('token'))
  ) {
    setLogout();
  }
}

/**
 * 设置登录状态
 */
export function setLogin(data = {}) {
  // 登录成功
  util.setCookie('userid', data.userid, 10);
  util.setCookie('token', data.token, 10);
}

/**
 * 打开链接
 * @param {String} url
 */
export function openUrl(url) {
  if (currentEnv.jyb) {
    window.location.href = `jtjr://web?url=${encodeURIComponent(url)}`;
  } else {
    setTimeout(() => {
      window.location.href = url;
    }, 0);
  }
}

/**
 * 没有登录
 */
export function callLogin() {
  // 客户端内部
  if (currentEnv.jyb) {
    globalVar.wv.ready(() => {
      globalVar.wv.login({
        phoneNo: '', // 登录手机号
        complete(res) {
          setLogin({
            userid: res.userId,
            token: res.token
          });
          // userId, token
          window.location.replace(
            getCurrentPageURL({
              userid: res.userId,
              token: res.token
            }),
          );
        },
      });
    });
  } else {
    const qsObj = qs.parse(window.location.search, {
      ignoreQueryPrefix: true
    });

    // 如果有userid，token应该去掉
    delete qsObj.userid;
    delete qsObj.token;

    const locOrigin = window.location.origin;
    const returnURL = encodeURIComponent(
      locOrigin +
      window.location.pathname +
      qs.stringify(qsObj, {
        addQueryPrefix: true
      }),
    );
    window.location.href = `${locOrigin}/act/unionlogin/pages/index.html?redirect=${returnURL}`;
  }
}

export function createPageURL(html, query = {}) {
  const {
    origin
  } = window.location;
  const {
    pathname
  } = window.location;
  const queryArr = [];
  // 合并公共参数
  query = extend({}, commonUrlInfo, query);
  for (const k in query) {
    queryArr.push(
      `${k}=${k === 'act_id' ? query[k] : encodeURIComponent(query[k])}`,
    );
  }
  return (
    origin +
    pathname.replace(/\w+\.html$/, html) +
    (queryArr.length > 0 ? `?${queryArr.join('&')}` : '')
  );
}

/**
 * 获取页面URL
 * @param {Object} query
 */
export function getCurrentPageURL(query) {
  const qsObj = qs.parse(window.location.search, {
    ignoreQueryPrefix: true
  });
  extend(qsObj, query);
  return (
    window.location.origin +
    window.location.pathname +
    qs.stringify(qsObj, {
      addQueryPrefix: true
    })
  );
}

/**
 * 跳转适配
 * @param {Object} url 支持格式：jtjr://??? | ???.html | /product/baina/detail.html | https://cdn.jyblife.com/product/baina/detail.html
 */
export function navTo(url = '', query = {}) {
  const {
    JTJR,
    COMPLETE,
    SNIPPETS
  } = URL_IDENTIFY_REGULAR;
  if (!url || typeof url !== 'string') return;
  if (JTJR.test(url)) {
    setTimeout(() => {
      window.location.href = url;
    }, 0);
  } else {
    const urlTmp = url;
    // 活动内部地址 ???.html
    url = !COMPLETE.test(urlTmp) && !SNIPPETS.test(urlTmp) ?
      createPageURL(url, query) :
      url;
    url = SNIPPETS.test(urlTmp) ? `${window.location.origin}${url}` : url;
    openUrl(url);
  }
}

/**
 * 链路还原
 * @param {String} url 跳转完整链接
 * （ios一些不支持异步请求时可尝试提供延迟参数）
 */
export function navToApp(url = '') {
  if (!url || typeof url !== 'string') return;
  ableInApp()
    .then(() => {
      navTo(url);
    })
    .catch(() => {
      openInstall.options.reqUrl = `${
        isLocalOrMock
          ? '/proxy'
          : window.interface_env || 'https://sweb.jyblife.com'
      }/Trans/access`;
      openInstall.exInfo.act_url = url; // 跳转链接，默认获取url参数act_url
      openInstall.exInfo.channel = util.getQuery('channel') || ''; // 渠道号，默认获取url参数channel
      openInstall.exInfo.act_id = actConfig.actID; // 场景还原活动号(密文)，默认获取url参数act_id
      openInstall.wakeupApp({
        env: globalVar.isProd ? 'prod' : 'sit'
      });
    });
}

/**
 * 判断是否在app内
 */
export function ableInApp() {
  return new Promise((resolve, reject) => {
    if (currentEnv.jyb) {
      resolve();
    } else {
      reject();
    }
  });
}
