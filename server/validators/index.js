import joi from '@hapi/joi';

const party = joi.object().keys({
  name: joi.string().trim().required(),
  hqaddress: joi.string().trim().required(),
  logourl: joi.string().uri().trim().required(),
});

const office = joi.object().keys({
  type: joi.string().trim().required(),
  name: joi.string().trim().required(),
});

const candidate = joi.object().keys({
  office: joi.number().required(),
  party: joi.number().required(),
  candidate: joi.number().required(),
});

const voteValidator = joi.object().keys({
  office: joi.number().required(),
  candidate: joi.number().required(),
});

const petition = joi.object().keys({
  createdby: joi.number().required(),
  office: joi.number().required(),
  body: joi.string().trim().required(),
});

export { party, office, candidate, voteValidator, petition };
