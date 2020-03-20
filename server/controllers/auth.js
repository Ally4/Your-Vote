import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import pool from '../database/config';
import { signupValidations, signinValidations } from '../validators/auth';


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
      firstname,
      lastname,
      othername,
      email,
      phonenumber,
      passporturl,
    } = req.body;

    const { rows } = await pool.query('INSERT INTO users (firstname, lastname, othername, email, password, phonenumber, passporturl, isadmin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [firstname, lastname, othername, email, password, phonenumber, passporturl, null]);
    const payload = {
      email,
      role: 'User',
    };
    const token = jwt.sign(payload, process.env.KEYWORD);
    const user = rows[0];
    delete user.password; delete user.isadmin; return res.status(201).json({
      status: 201,
      message: 'User have been regidtered in the system successfully',
      data: {
        token,
        user,
      },
    });
  }


  static async signin(req, res) {
    const { error } = signinValidations.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
    const { email, password } = req.body;
    const { rows, rowCount } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (!rowCount) {
      return res.status(404).json({
        status: 404,
        message: 'The email you are trying to use in not in the system',
      });
    }
    const user = rows[0];
    const compare = bcrypt.compareSync(password, user.password);
    if (!compare) {
      return res.status(401).json({
        status: 401,
        message: 'The password you are using is not right',
      });
    }
    const payload = { id: user.id, role: user.isadmin ? 'Admin' : 'User' };
    const token = jwt.sign(payload, process.env.KEYWORD);
    delete user.password;
    delete user.isadmin;
    return res.status(200).json({
      status: 200,
      message: 'You are logged in the system',
      data: {
        token,
        user,
      },
    });
  }
}


export default signupSigninController;
