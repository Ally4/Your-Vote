import express from 'express';
import signupController from '../controllers/signupControllers';

const signsRouters = express.Router();

signsRouters.post('api/v1/auth/signup', signupController);

export default signsRouters;
