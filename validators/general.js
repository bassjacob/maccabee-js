const { isDeepEqual } = require('../helpers');

function immutable () {
  return function (key, params, instance) {
    if (!isEqual(params[key], instance[key])) return Promise.reject('Can not change');
    return Promise.resolve();
  };
}

function present () {
  return function (key, params) {
    if (!params[key]) return Promise.reject('Can not be null');
    return Promise.resolve();
  };
}

function equal (value) {
  return function (key, params) {
    if (params[key] !== value) return Promise.reject(`Must be === ${value}`);
    return Promise.resolve();
  };
}

function deepEqual (value) {
  return function (key, params) {
    if (isDeepEqual(params[key], value)) return Promise.reject(`Must be === ${JSON.stringify(value)}`);
    return Promise.resolve();
  };
}

module.exports = {
  equal,
  immutable,
  presence,
};
