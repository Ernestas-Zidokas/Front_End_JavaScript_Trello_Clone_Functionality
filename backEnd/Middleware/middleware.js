let jwt = require('jsonwebtoken');
let config = require('../config/config');
let User = require('../Models/userModel');

let authenticate = (req, res, next) => {
  let token = req.header('x-auth');
  let decoded;
  try {
    decoded = jwt.verify(token, config.secretSalt);
    User.findOne({
      _id: decoded._id,
      'tokens.access': 'auth',
      'tokens.token': token,
    }).then(user => {
      if (user) {
        req.user = user;
        req.token = token;
        next();
      } else {
        res.status(401).json('You are not authorized');
      }
    });
  } catch (e) {
    res.status(400).json(e);
  }
};

module.exports = {
  authenticate,
};
