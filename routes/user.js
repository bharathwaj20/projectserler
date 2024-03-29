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

router.post('/signUp', (req,res)=>{

    //Form Validation
    const{errors, isValid} = validateRegisterInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }
     
    User.findOne({email: req.body.email}).then(user =>{
        if(user){
            return res.status(400).json({email: "Email already Exists"});
        }
        else
        {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            //Hashing Passwords before saving
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) throw err;
                  newUser.password = hash;
                  newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
              });
        
        }

    });

    
        
});

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