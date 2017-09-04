function lessThan(value) {
  return (key, params) => {
    if (params[key] >= value) {
      return Promise.reject(`Must be < ${value}`);
    }
    return Promise.resolve();
  };
}

function lessThanOrEqual(value) {
  return (key, params) => {
    if (params[key] > value) return Promise.reject(`Must be <= ${value}`);
    return Promise.resolve();
  };
}

function greaterThanOrEqual(value) {
  return (key, params) => {
    if (params[key] < value) return Promise.reject(`Must be >= ${value}`);
    return Promise.resolve();
  };
}

function greaterThan(value) {
  return (key, params) => {
    if (params[key] <= value) return Promise.reject(`Must be > ${value}`);
    return Promise.resolve();
  };
}

module.exports = {
  lessThan,
  lessThanOrEqual,
  greaterThan,
  greaterThanOrEqual,
};
