const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { JWT_TOKEN } = require('../config/keys');
const crypto = require('crypto');
const verifyToken = require('../middleware/verifyToken');

router.post('/signup', (req, res, next) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password)
    return res.status(422).json({ error: 'Please add all the fields' });

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: 'user with the same Id already exists' });
      } else {
        //encrypting the password to string size 12
        bcrypt.hash(password, 12).then((hashedPassword) => {
          User.create({
            name: name,
            password: hashedPassword,
            email: email.toLowerCase(),
            pic: pic,
          })
            .then((user) => {
              res.json({ message: 'Successfully signed up' });
            })
            .catch((error) => {
              res.json({ error: 'Error signing up' });
            });
        });
      }
    })
    .catch((err) => {
      res.json({ error: 'Something went wrong' });
    });
});

router.post('/signin', (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(422).json({ error: 'Correct fields required' });

  User.findOne({ email: email.toLowerCase() })
    .then((savedUser) => {
      if (!savedUser) {
        return res.status(422).json({ error: 'user does not exist' });
      } else {
        bcrypt
          .compare(password, savedUser.password)
          .then((passwordMatch) => {
            if (passwordMatch) {
              //res.json({message:"Successfully signed in"});
              const token = jwt.sign({ _id: savedUser._id }, JWT_TOKEN);
              const { _id, name, email, pic, followers, following } = savedUser;
              res.json({
                token: token,
                user: { _id, name, email, pic, followers, following },
              });
            } else res.json({ message: 'Email or Password is incorrect' });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      res.json({ error: 'Something went wrong' });
    });
});

module.exports = router;
