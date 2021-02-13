const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/post');
const User = require('../models/user');

const verifyToken = require('../middleware/verifyToken');

router.get('/profile/:id', verifyToken, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select('-password')
    .then((user) => {
      Post.find({
        postedBy: req.params.id,
      })
        .populate('postedBy', '_id name')
        .exec((err, posts) => {
          if (err) return res.status(422).json({ error: err });
          else res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({
        error: 'User Not Found',
      });
    });
});

router.put('/updatepic', verifyToken, (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { pic: req.body.pic } },
    { new: true },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: 'pic can not be posted' });
      }
      res.json(result);
    }
  );
});

router.post('/search-user', (req, res) => {
  //'^' it will return all the records which starts with req.body.query
  let userSearch = new RegExp('^' + req.body.query);
  //here we are searching the email that starts with userSearch
  User.find({ email: { $regex: userSearch } })
    .select('_id email')
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => console.log(err));
});

router.put('/follow', verifyToken, (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      )
        .select('-password')
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

router.put('/unfollow', verifyToken, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        { new: true }
      )
        .select('-password')
        .then((result) => {
          res.json(result);
        })
        .catch((err) => {
          return res.status(422).json({ error: err });
        });
    }
  );
});

module.exports = router;
