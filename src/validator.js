/*
  takes { key: [validators], key: [validators] }
  resolves if all pass
  rejects with result of all if any fail
*/

function runValidator(params, instance) {
  return function ({ key, validator }) {
    return validator(key, params, instance)
      .catch(err => ({ key, err }));
  };
}

function reducer(map) {
  return function(acc, key) {
    return acc.concat(map[key].map(validator => { key, validator }));
  };
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

function validator(map) {
  const validators = Object.keys(map).reduce(reducer(map), []);

  return (instance, params) => {
    const runner = runValidator(params, instance)

    return Promise.all(validatorArray.map(runner))
      .then(calculateErrors)
      .then(errors => {
        if (Object.keys(errors).length > 0) {
          const error = new Error('Could not validate');
          error.name = 'ValidationError';
          error.data = errors;
          throw error;
        }
      });
  };
}

module.exports = validator;
