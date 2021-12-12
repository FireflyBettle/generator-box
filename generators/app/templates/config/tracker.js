/**
 * 异常数据收集
 * @see http://doc.fe.jyb.com/book/common-lib/packages/lib-tracker/
 */

import tracker from '@jyb/lib-tracker';

const isProd = process.env.NODE_ENV === 'production';

const ignoreCodes = [];

tracker.init({
  pid: 'test', // 这里修改为tracker上申请的pid
  debug: !isProd,
  ajax: isProd,
  env: 'prod',
  apiReportFilter(xhr, sendParams) {
    const resultCode = sendParams.result.split(',')[0];
    if (ignoreCodes.indexOf(resultCode) > -1) {
      return false;
    }
    return true;
  },
});

export default tracker;
