import joi from '@hapi/joi';

const signupValidations = joi.object().keys({
  firstname: joi.string().min(7).max(20).trim().required(),
  lastname: joi.string().min(7).max(20).trim().required(),
  othername: joi.string().min(7).max(20).trim().required(),
  email: joi.string().email().required(),
  password: joi.string().min(7).max(20).trim().required(),
  phonenumber: joi.string().min(7).max(20).trim().required(),
  passporturl: joi.string().min(7).max(20).trim().required(),
});
const signinValidations = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().min(7).max(20).trim().required(),
});

export { signupValidations, signinValidations };
