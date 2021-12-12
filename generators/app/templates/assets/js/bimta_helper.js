import extend from '@jyb/lib-extend';

const $body = document.body;

export const statEA = $body.getAttribute('data-stat-ea');
export const statEB = $body.getAttribute('data-stat-eb');

export function hook(instance, params = {}) {
  const statParams = extend({ statEA, statEB }, params);
  instance.$reportPv = (options = {}) => {
    instance.pageview({ ea: statParams.statEA, eb: statParams.statEB, ec: 'pv' }, options);
  };

  instance.$reportEvent = (ec, options = {}) => {
    instance.event({ ea: statParams.statEA, eb: statParams.statEB, ec }, options);
  };

  return instance;
}

