const User = require("../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
require("dotenv").config();

exports.signup = (req, res) => {
  // EXPRESS-VALIDATOR ERRORS CHECKING
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const user = new User(req.body);
  // HASHING THE PASSWORD
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync(user.password, salt);
  // USING HASHED PASSWORD FOR DATABASE
  user.password = hash;

  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "NOT able to save the user",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      password: hash,
    });
  });
};

exports.signin = (req, res) => {
  // EXPRESS-VALIDATOR ERRORS CHECKING
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  //Checking if the user has registered or not
  User.findOne({
    email,
  }).then((user) => {
    if (!user) {
      return res.status(422).json({
        error: "User with this email is not present",
      });
    }

    bcrypt
      .compare(password, user.password)
      .then((isMatch) => {
        if (isMatch) {
          //If password matches then issue a token depending upon the payload given
          const token = jwt.sign(
            {
              _id: user._id,
            },
            process.env.SECRET
          );
          res.json({
            token,
            user,
          });
        } else {
          res.json({
            error: "Sorry Incorrect Email/Password",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

//Get details of logged in user
exports.dashboard = (req, res) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.json(err);
    });
};

exports.updateUser = (req,res) => {
  //express validators checking
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
 User.findById(req.user._id)
 .then((user) => {

  //Only updating fields if given by the user else keeping the previous ones
   if(req.body.name) {
     user.name = req.body.name;
   }
   if(req.body.email) {
     user.email = req.body.email;
   }
   if(req.body.password) {
      // hashing the password
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(req.body.password, salt);
      user.password = hash;
   }
   user.save()
   .then((user) => {
     res.status(200).json(user)
   })
 })
  .catch((err) => {
    res.json(err);
  })
}