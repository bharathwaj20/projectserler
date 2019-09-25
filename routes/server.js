const express =require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); //Used to Hash passwords
const jwt = require('jsonwebtoken'); //provides authorization to passwords using encryptions
const keys = require('../config/keys');
const passport = require('../validations/passport');
const bodyParser =require('body-parser');
const users = require('../model/User_details');
const app =express();

//Body Parser MiddleWare
app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );


const db = require('../config/keys').mongoURI;  //DB connectivity
mongoose.connect(db,{useNewUrlParser : true }).then(()=> console.log('Mongo Connected')).catch(err => console.log(err));  //connecting mongoose to mongodb

//Load Input Validations
const validateRegisterInput = require('../validations/signUp');
const validateLoginInput = require('../validations/login');

//Load User Model
const User = require('../model/User_details');

const port = process.env.PORT || 3000;  //setting the environmental port
app.listen(port,()=>console.log('server running on port ${port} !'));



