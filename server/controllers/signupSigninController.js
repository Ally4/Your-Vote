import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import pool from '../database/configuration';

import { signupValidations, signinValidations } from '../validators/signupValidators';


dotenv.config();

class signupSigninController {
  static async signup(req, res) {
    const signup = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
    const { error } = signupValidations.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }

    if (signup.rows && signup.rows.length > 0) {
      return res.status(409).json({
        status: 409,
        message: 'The email you are trying to use is already in use',
      });
    }
    const password = bcrypt.hashSync(req.body.password, 10);
    const {
      firstname, lastname, othername, email, phonenumber, passporturl,
    } = req.body;

    await pool.query('INSERT INTO users (firstname, lastname, othername, email, password, phonenumber, passporturl) VALUES ($1, $2, $3, $4, $5, $6, $7)', [firstname, lastname, othername, email, password, phonenumber, passporturl]);
    const payload = { email, firstname };
    const token = jwt.sign(payload, process.env.KEYWORD);
    return res.status(201).json({
      status: 201,
      message: 'User have been regidtered in the system successfully',

      data: {
        token,
      },
    });
  }


  static async signin(req, res) {
    const signin = await pool.query('SELECT * FROM users WHERE email = $1', [req.body.email]);
    const { error } = signinValidations.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    if (signin.rows === 'undefined' || signin.rows.length === 0) {
      return res.status(404).json({
        status: 404,
        message: 'The email you are trying to use in not in the system',
      });
    }
    const compare = bcrypt.compareSync(req.body.password, signin.rows[0].password);
    if (!compare) {
      return res.status(401).json({
        status: 401,
        message: 'The password you are using is not right',
      });
    }
    const payload = { email: signin.rows[0].email, isadmin: signin.rows[0].isadmin };
    const token = jwt.sign(payload, process.env.KEYWORD);
    return res.status(200).json({
      status: 200,
      message: 'You are logged in the system',
      data: {
        token,
      },
    });
  }
}


export default signupSigninController;
