const mongoose =require('mongoose');
const schema = mongoose.Schema;

var user_schema = new schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      }

});

module.exports = user_model = mongoose.model('User', user_schema);