const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SALT_I = 10;
require('dotenv').config();

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

userSchema.pre('save', async function(next) {
  let user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_I, async function(err, salt) {
      if (err) return await next(err);
      bcrypt.hash(user.password, salt, async function(err, hash) {
        if (err) return await next(err);
        user.password = hash;
        await next();
      });
    });
  } else {
    await next();
  }
});

userSchema.methods.comparePassword = async function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, async function(
    err,
    isMatch
  ) {
    if (err) return await cb(err);
    await cb(null, isMatch);
  });
};

userSchema.methods.generateToken = async function(cb) {
  let user = this;
  let token = jwt.sign(user._id.toHexString(), process.env.SECRET);

  user.token = token;
  await user.save(async function(err, user) {
    if (err) return await cb(err);
    await cb(null, user);
  });
};

userSchema.statics.findByToken = async function(token, cb) {
  let user = this;

  jwt.verify(token, process.env.SECRET, async function(err, decode) {
    await user.findOne({ _id: decode, token: token }, async function(
      err,
      user
    ) {
      if (err) return await cb(err);
      await cb(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
