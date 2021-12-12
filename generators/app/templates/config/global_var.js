/**
 * 全局变量，统一管理
 */

const globalVar = {
  // jsapi
  wv: window.wv,
  // openid
  openid: window.openid,
  // 微信支付类型
  wxPayType: window.wxPayType,
  // 是否线上环境
  isProd: !(/sit/.test(window.location.origin)),
};

export default globalVar;
