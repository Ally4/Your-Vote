import express from 'express';
import signsController from '../controllers/signupSigninController';

const signsRouters = express.Router();

signsRouters.post('/api/v1/auth/signup', signsController.signup);

export default signsRouters;