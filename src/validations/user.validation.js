const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getUser,
};
