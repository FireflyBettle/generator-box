import * as helper from '@/assets/js/helper';
import { API_CODE } from '@/config/enum';

const userInfo = helper.getUserInfo();

export default function isNotLogin(code) {
  return code == API_CODE.NOT_LOGIN ||
    code == API_CODE.NOT_LOGIN1 ||
    code == API_CODE.NOT_LOGIN2 ||
    code == API_CODE.NOT_LOGIN3 ||
    code == API_CODE.INVALID_SESSION ||
    code == API_CODE.INVALID_SESSION1 ||
    code == API_CODE.NEED_USERID ||
    code == API_CODE.USER_NOT_LOGIN ||
    ((code == API_CODE.ILLEGAL_PARAMS || code == API_CODE.ILLEGAL_PARAMS1) && (!userInfo.userid || !userInfo.token));
}