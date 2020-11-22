const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  followers: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],

  pic: {
    type: String,
    default:
      'https://res.cloudinary.com/jackent2b/image/upload/v1593701182/defaultpic_tkj0ca.png',
  },
});

const User = new mongoose.model('User', userSchema);
module.exports = User;
