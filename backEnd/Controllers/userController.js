let UserModel = require('../Models/userModel');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let config = require('../config/config');

let register = (request, response) => {
  let data = request.body;
  if (data.password == data.passwordAgain) {
    let user = new UserModel();
    user.email = data.email;
    user.password = data.password;
    user.save().then(user => {
      response.json(user).catch(e => {
        response.status(400).json(e);
      });
    });
  } else {
    response.status(401).json('passwords dont match');
  }
};

let login = (request, res) => {
  let data = request.body;
  UserModel.findOne({ email: data.email })
    .then(user => {
      if (!user) {
        res.json('No user with this email');
        return;
      }
      bcrypt.compare(data.password, user.password, (error, response) => {
        if (response) {
          let access = 'auth';
          let token = jwt
            .sign(
              {
                _id: user._id.toHexString(),
                access,
              },
              config.secretSalt,
            )
            .toString();
          user.tokens.push({
            access,
            token,
          });
          user.save().then(useris => {
            res.header('x-auth', token).json(useris);
          });
        } else {
          res.json('incorrect password');
        }
      });
    })
    .catch(e => {
      response.status(400).json(e);
    });
};

let logout = (req, res) => {
  let user = req.user;
  let token = req.token;
  user
    .update({
      $pull: {
        tokens: {
          token,
        },
      },
    })
    .then(() => {
      res.json('logged out');
    })
    .catch(e => res.status(400).json(e));
};

let getUser = (request, response) => {
  let data = request.body;
  UserModel.find({ email: data.email }).then(user => {
    response.json(user);
  });
};

module.exports = {
  register,
  getUser,
  login,
  logout,
};
