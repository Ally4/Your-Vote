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
  office: joi.number().min(7).max(20).trim().required(),
  party: joi.number().min(7).max(20).trim().required(),
  candidate: joi.number().min(7).max(20).trim().required(),
});

const vote = joi.object().keys({
  createdby: joi.number().min(7).max(20).trim().required(),
  office: joi.number().min(7).max(20).trim().required(),
  candidate: joi.number().min(7).max(20).trim().required(),
});

const petition = joi.object().keys({
  createdby: joi.number().min(7).max(20).trim().required(),
  office: joi.number().min(7).max(20).trim().required(),
  body: joi.string().min(7).max(20).trim().required(),
});

export { party, office, candidate, vote, petition };
