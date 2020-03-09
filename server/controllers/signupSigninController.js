import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import users from '../models/users';
import signupValidations from '../validators/signupSigninValidators';

dotenv.config();

class signupSigninController {
  static signup(req, res) {
    const { error } = signupValidations.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    const emailSignup = users.find(i => i.email === req.body.email);
    if (emailSignup) {
      return res.status(409).json({
        status: 409,
        message: 'The email you are trying to sign with is already in use',
      });
    }
    const password = bcrypt.hashSync(req.body.password, 10);
    const Id = users.length + 1;
    const {
      firstname, lastname, email,
    } = req.body;
    users.push({
      Id, firstname, lastname, email, password,
    });
    const payload = { email, firstname };
    const token = jwt.sign(payload, process.env.KEYWORD);
    return res.status(201).json({
      status: 201,
      message: 'User have been created successfully',
      data: {
        token,
      },
    });
  }
}


export default signupSigninController;
