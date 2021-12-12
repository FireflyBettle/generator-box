/**
 * enum
 */

// 接口code
export const API_CODE = {
  NOT_LOGIN: 5000020001, // 用户未登录，缺少userid或token
  NOT_LOGIN1: '5201201', // 用户未登录
  NOT_LOGIN2: '10000008', // 用户未登录2，无效的会话
  NOT_LOGIN3: '5000010001', // 用户未登录3，无效的会话
  INVALID_SESSION: '22000010', // 无效的会话
  INVALID_SESSION1: '2201205',
  ILLEGAL_PARAMS: '5000020002', // 下单失败
  ILLEGAL_PARAMS1: '5100009', // 参数错误
  NOT_IDENTITY_AUTH: '9024211', // 未实名认证
  NEED_USERID: '9024202', // 必要参数:userid值为空
  USER_NOT_LOGIN: 4002309, // 用户未登录
  PARAMS_ERROR: 4002310 // 无效参数或参数错误
};

// 兑换状态
export const EXCHANGE_STATUS = {
  YES: '1', // 已兑换
  NO: '0' // 未兑换
};
