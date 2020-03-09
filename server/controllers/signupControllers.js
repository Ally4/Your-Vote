import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import signupValidations from '../validators/signupSigninValidators';

dotenv.config();

class signupSigninController {
  static signup(req, res) {
    const { error } = signupValidations.validate(req.body);
    if (error) {
      res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
  }
}


export default signupSigninController;
