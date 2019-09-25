const express = require('express');
var mongoose =require('mongoose');
const path =require('path');
const app = express();
const db = require('../config/keys').mongoURI;
mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=> console.log('Mongo Connected')).catch(err => console.log(err));
const user_model = require('../model/User_details');
app.use(express.json());

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





