const express =require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); //Used to Hash passwords
const jwt = require('jsonwebtoken'); //provides authorization to passwords using encryptions
const keys = require('../config/keys');

//Load Input Validations
const validateRegisterInput = require('../validations/signUp');
const validateLoginInput = require('../validations/login');

//Load User Model
const User = require('../model/User_details');

router.post('/signUp', (req,res)=>{

    //Form Validation
    const{errors, isValid} = validateRegisterInput(req.body);

    //Check Validation
    if(!isValid){
        return res.status(400).json(errors);
    }
     
    User.findOne({email: req.body.email}).then(user =>{
        if(user){
            return res.status(400).json({email: "Email lready Exists"});
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

