/*
  takes { key: [validators], key: [validators] }
  resolves if all pass
  rejects with result of all if any fail
*/

function runValidator(params, instance) {
  return ({ key, validator }) =>
    validator(key, params, instance).catch(error => ({ key, error }));
}

function reducer(map) {
  return (acc, key) =>
    acc.concat(map[key].map(validator => ({ key, validator })));
}

function calculateErrors(results) {
  return results.reduce((acc, result) => {
    if (result) {
      acc[result.key] = acc[result.key] || [];
      acc[result.key].push(result.error);
    }

    return acc;
  }, {});
}

function handleResults(results, params, instance, merge) {
  const errors = calculateErrors(results);

  if (Object.keys(errors).length > 0) {
    const error = new Error('Could not validate');
    error.name = 'ValidationError';
    error.data = errors;
    throw error;
  }

  return merge(params, instance);
}

function defaultMerge(params, instance) {
  return Object.keys(params).reduce((acc, key) => {
    acc[key] = params[key];

    return acc;
  }, instance);
}

function validate(map, merge = defaultMerge) {
  const validators = Object.keys(map).reduce(reducer(map), []);

  return (params, instance) => {
    const runner = runValidator(params, instance);

    return Promise.all(validators.map(runner)).then(results =>
      handleResults(results, params, instance, merge)
    );
  };
}

module.exports = validate;
