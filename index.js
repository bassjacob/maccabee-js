const validatorFactory = require('./src/validator');

const generalValidators = require('./src/validators/general');
const numericalValidators = require('./src/validators/numerical');
const sequelizeValidators = require('./src/validators/sequelize');

module.exports = {
  validatorFactory,
  validators: {
    general: generalValidators,
    numerical: numericalValidators,
    sequelize: sequelizeValidators,
  },
};
