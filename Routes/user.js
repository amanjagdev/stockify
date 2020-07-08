const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const { body } = require("express-validator");
const { signin, signup, dashboard, signout,updateUser } = require("../Controllers/user");
const requireLogin = require("../Authentication/requireLogin");


//Registering a user
// Post /api/signup
// @Public
router.post(
  "/signup",
  [
    body("name", "Please provide a valid name").not().isEmpty(),
    body("email", "Please provide a valid email address").isEmail(),
    body(
      "password",
      "Please provide a password altleast 6 characters long"
    ).isLength({ min: 6 }),
  ],
  signup
);

//Signning in a user
// Post /api/signin
// @Public
router.post(
  "/signin",
  [
    body("email", "Please provide a valid email address").isEmail(),
    body("password", "Please provide a password").not().isEmpty(),
  ],
  signin
);

//Get User Details
// Post /api/getUser
// @Protected
router.get("/getUser", requireLogin, dashboard);

//Updating a user
// Post /api/update
// @Protected
 router.post("/update",
 [
  body("name", "Please provide a valid name").not().isEmpty(),
  body("email", "Please provide a valid email address").isEmail(),
  body(
    "password",
    "Please provide a password altleast 6 characters long"
  ).isLength({ min: 6 }),
 ],
 requireLogin,updateUser);

module.exports = router;
