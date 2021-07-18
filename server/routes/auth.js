const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../key.js');
const requireLogin = require('../middleware/requireLogin');

router.get('/protected', requireLogin, (req,res)=>{  
    console.log("middleware");
    res.send("I am middleware");
});

router.get('/',(req,res) => {
    res.send('hello');
})

router.post('/signup',(req,res) => {
    const {name,email,password} = req.body;
    if(!email || !password || !name){
        return  res.status(404).json({error:'Please fill all the field'});
    }
    //res.json({message:"information saved successfully!!"});
    User.findOne({email:email})
    .then((savedUser) => {
        if(savedUser){
            return res.status(200).json({error:'user already exist'});
        }
        bcrypt.hash(password,12)
        .then(hashedpassword => {
            const user = new User({
                email,
                password: hashedpassword,
                name
            })
    
            user.save()
            .then(user => {
                res.json({message:"saved successfully"});
            })
            .catch(err => {
                console.log(err);
            })
        })      
        
    })
    .catch(err => {
        console.log(err);
    })
})


router.post('/signin',(req,res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(404).json({error:"please add email or password"});
    }
    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
           return res.status(404).json({error:"Invalid Email or password"});
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch => {
            if(doMatch){
                //res.json({message:"Login Successfully"});
                const token = jwt.sign({_id:savedUser},JWT_SECRET);
                const {_id,name,email} = savedUser
                res.json({token, user:{_id,name,email}});
            }else{
                return res.status(404).json({error:"Invalid Email or Password"});
            }
        })
       
    })
    .catch(err => {
        console.log(err);
    })
})


module.exports = router;