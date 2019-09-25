//Used to authenticate the endpoints without using sessions

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("user_model");
const keys = require("../config/keys");
const opts = {};        //initializing the options
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();  //Extracting using Bearer
opts.secretOrKey = keys.secretOrKey;     //Feeding key onto the options
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {  //new JwtStrategy(options,verify) where verify contains verify(jwt_payload, done)
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);     // done has three parameters done(error, user, info)
           }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};