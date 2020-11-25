const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = require('../config/keys');
const mongoose = require('mongoose');
const User = require('../models/user');

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      err: 'You should be logged in',
    });
  }

  const token = req.headers.authorization.split(' ')[1];
  //verifying user token with JWT_SECRET key
  jwt.verify(token, JWT_TOKEN, (err, payload) => {
    if (err) {
      console.log(err);
      return res.status(401).json({
        err: 'Something went wrong, Please Log in again',
      });
    } else {
      const { _id } = payload;
      User.findById(_id).then((userData) => {
        req.user = userData;
        next();
      });
    }
  });
};

module.exports = verifyToken;
