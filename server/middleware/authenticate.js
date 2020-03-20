import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const authentication = async (req, res, next) => {
  const header = req.headers.authorization;
  if (typeof header === 'undefined') {
    res.status(401).json({
      status: 401,
      message: 'Check your header and put in the token',
    });
  } else {
    await jwt.verify(header, process.env.KEYWORD, (err, payload) => {
      if (err) {
        return res.status(403).json({
          status: 403,
          message: 'The token inserted is not right',
        });
      }
      const { id, role } = payload;
      req.userId = id;
      if (role === 'Admin') req.isAdmin = true;
      if (role === 'User') req.isUser = true;
      next();
    });
  }
};

export const authorization = (role) => {
  return (req, res, next) => {
    if (role === 'Admin' && req.isAdmin) return next(); if (role === 'User' && req.isUser) return next();
    return res.status(403).json({
      status: 403,
      message: 'You are not allowed to proceed any further',
    });
};
};
export default authentication;
