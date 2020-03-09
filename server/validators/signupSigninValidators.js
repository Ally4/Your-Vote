import joi from '@hapi/joi';

const signupValidations = joi.object().keys({
  firstname: joi.string().min(7).max(20).trim().required(),
  lastname: joi.string().min(7).max(20).trim().required(),
  email: joi.email().min(7).max(20).trim().required(),
  password: joi.string().min(7).max(20).trim().required(),
});

export default signupValidations;
