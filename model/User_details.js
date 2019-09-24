const mongoose =require('mongoose');
const schema = mongoose.Schema;

var user_schema = new schema({
    First_Name : 'String',
    Last_name : 'String',
    EmailID : { type :'String', require: true},
    Password : 'String',
    Access_Type : 'String'

});

module.exports = user_model = mongoose.model('User', user_schema);