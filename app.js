const express = require('express');
const mongoose =require('mongoose');
const bodyParser = require('body-parser');
const path =require('path');
//const config = require('config');
const app = express();
const db = "mongodb+srv://Santosh2695:sanbal2695@cluster0-xwxaw.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=> console.log('Mongo Connected')).catch(err => console.log(err));
const user_model = require('./model/User_details');
app.use(express.json());


//BodyParser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
// Read All Entries
app.get('/', (req,res) =>{
user_model.find().then(items => console.log( res.json(items)));
});

// Add a new User
app.post('/', (req,res)=>{
    const new_user = new user_model({
        First_Name: 'Santosh', 
        Last_name : 'Balaaji', 
        EmailID : 'sv.santosh', 
        Password : '12345', 
        Access_Type: 'Student'
    });
    new_user.save().then(item => res.json(item));    
});


// Delete an entry
app.delete('/:id',(req,res) =>{
user_model.findOneAndDelete({_id: req.params.id})
.then(()=> res.json({success: true}))
.catch(err => res.status(404).json({success : false}));
});

// Update an entry
app.put('/:id',(req,res) =>{
    user_model.findOneAndDelete({_id: req.params.id}, req.body)
    .then(()=> res.json({success: true}))
    .catch(err => res.status(404).json({success : false}));
});


const port =5000;
app.listen(port, ()=> console.log('Server Started on port ${port}'));






/*mongoose.connect('mongodb+srv://Santosh2695:sanbal2695@cluster0-xwxaw.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error"));
db.once('open',function(){
    console.log('success');
});

var user_schema = new mongoose.Schema({
    First_Name : 'String',
    Last_name : 'String',
    EmailID : { type :'String', require: true},
    Password : 'String',
    Access_Type : 'String'

});
user_schema.methods.GetFullName = function(){
    return this.First_Name + this.Last_name

}

var users = mongoose.model('user_model',user_schema);
var santosh = new users({First_Name: 'Santosh', Last_name : 'Balaaji', EmailID : 'sv.santosh', Password : '12345', Access_Type: 'Student'});
var fullName = santosh.GetFullName();
console.log(fullName);

users.find({'FirstName' : 'Santosh'},function(err)
{
if(err) return handleError(err);
else console.log();
});*/