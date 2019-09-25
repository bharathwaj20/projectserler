const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Load input validation
const validateRegisterInput = require("../validations/signUp");
const validateLoginInput = require("../validations/login");
// Load User model
const User = require("../model/User_details");


router.post('/login',(req,res)=>{
    const { errors, isValid } = validateLoginInput(req.body);
// Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email =req.body.email;
  const password = req.body.password;

  // Find User By Email
  User.findOne({email}).then(user=>{
    if(!user)
    {
        return res.status(404).json({emailnotfound: 'email not found'});
    }

    // Find Password
    bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            // User matched
            // Create JWT Payload
            const payload = {
              id: user.id,
              name: user.name
            };
            // Sign token
        jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
    });
  });

});

module.exports=router;