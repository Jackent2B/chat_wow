const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/post');
const verifyToken = require('../middleware/verifyToken');

router.post('/createpost', verifyToken, (req, res) => {
  const { title, body, photo } = req.body;
  console.log(title, body, photo);
  if (!title || !body || !photo) {
    return res.status(422).json({ error: 'Please Provide all the fields' });
  }
  req.user.password = undefined;
  Post.create({
    title: title,
    body: body,
    photo: photo,
    postedBy: req.user,
  })
    .then((result) => {
      res.json({ message: 'Post Created Successfully', post: result });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error: 'Error Occured while creating a post' });
    });
});

router.get('/allpost', verifyToken, (req, res) => {
  Post.find({})
    .populate('postedBy', '_id name pic')
    .populate('comments.postedBy', '_id name')
    .sort('-createdAt') //createdAt field will automatically be created using "timestamps:true" in posts model.
    .then((result) => {
      res.json({
        posts: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error: 'Error Occured while creating a post' });
    });
});

router.get('/getsubpost', verifyToken, (req, res) => {
  //checking: if postedBy is in following
  Post.find({ postedBy: { $in: req.user.following } })
    .populate('postedBy', '_id name')
    .populate('comments.postedBy', '_id name')
    .sort('-createdAt')
    .then((posts) => {
      res.json({ posts });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get('/mypost', verifyToken, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate('postedBy', '_id name')
    .sort('-createdAt')
    .then((result) => {
      res.json({
        posts: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error: 'Error Occurred while showing the post' });
    });
});

router.put('/like', verifyToken, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: {
        likes: req.user._id,
      },
    },
    {
      //to get a updated record from mongodb
      new: true,
    }
  ).exec((err, result) => {
    if (err) return res.status(422).json({ error: err });
    else return result;
  });
});

router.put('/unlike', verifyToken, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      //pull the preson in the likes array who has lisked the post
      $pull: {
        likes: req.user._id,
      },
    },
    {
      //to get a updated record from mongodb
      new: true,
    }
  ).exec((err, result) => {
    if (err) return res.status(422).json({ error: err });
    else return result;
  });
});

router.put('/comment', verifyToken, (req, res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id,
  };
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate('comments.postedBy', '_id name')
    .populate('postedBy', '_id name')
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
});

router.delete('/deletepost/:postId', verifyToken, (req, res) => {
  Post.findOne({ _id: req.params.postId })
    .populate('postedBy', '_id')
    .exec((err, post) => {
      if (err || !post) {
        return res.status(422).json({ error: err });
      }
      if (post.postedBy._id.toString() === req.user._id.toString()) {
        post
          .remove()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
});

router.put('/deleteComment', verifyToken, (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      //pull the comment out of the comments array
      $pull: {
        comments: { _id: req.body.commentId },
      },
    },
    {
      //to get a updated record from mongodb
      new: true,
    }
  ).exec((err, result) => {
    if (err) return res.status(422).json({ error: err });
    else return result;
  });
});

module.exports = router;
