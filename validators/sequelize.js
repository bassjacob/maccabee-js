function defaultBuilder = value => ({ where: { id: value } });

function exists (model, builder=defaultBuilder) {
  return function (key, params, instance) {
    return model
      .find(builder(params[key]))
      .then(instance => {
        if (!instance) return Promise.reject('Must exist in db');
      });
  };
}

module.exports = {
  exists,
};
