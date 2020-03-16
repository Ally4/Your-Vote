import joi from '@hapi/joi';

const party = joi.object().keys({
  name: joi.string().min(7).max(20).trim().required(),
  hqaddress: joi.string().min(7).max(20).trim().required(),
  logourl: joi.string().min(7).max(20).trim().required(),
});

const office = joi.object().keys({
  type: joi.string().min(7).max(20).trim().required(),
  name: joi.string().min(7).max(20).trim().required(),
});

const candidate = joi.object().keys({
  office: joi.number().required(),
  party: joi.number().required(),
  candidate: joi.number().required(),
});

const vote = joi.object().keys({
  createdby: joi.number().required(),
  office: joi.number().required(),
  candidate: joi.number().required(),
});

const petition = joi.object().keys({
  createdby: joi.number().required(),
  office: joi.number().required(),
  body: joi.string().min(7).max(20).trim().required(),
});

export { party, office, candidate, vote, petition };
