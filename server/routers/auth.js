import express from 'express';
import signsController from '../controllers/auth';

const signsRouters = express.Router();

signsRouters.post('/api/v1/auth/signup', signsController.signup);

signsRouters.post('/api/v1/auth/signin', signsController.signin);

export default signsRouters;
