const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {SECRETKEY} = require('../keys')
const requireLogin = require('../middleware/requireLogin')
const router = express.Router()

router.post("/signup",(req,res)=>{
    const {name,email,password,pic} = req.body
    if(!email || !name || !password){
        res.status(422).json({error:"add all require fields"})
    }
    else{
        User.findOne({email:email})
            .then((savedUser)=>{
                if(savedUser){
                res.status(422).json({error:"user already exist"})
                }
                else{
                    bcrypt.hash(password,12)
                          .then(hashedPassword=>{
                            const user = new User({
                                name:name,
                                email:email,
                                password:hashedPassword,
                                pic
                            })
                            user.save()
                                .then(user =>{
                                    res.status(200).json({msg:"new user added successfully"})
                                })
                          })
                }
            })

    }
})

router.post("/login",(req,res)=>{
    const{email,password} = req.body
    if(!email || !password){
        res.status(422).json({error:"please fill email and password"})
    }
    else{
        User.findOne({email:email})
            .then(dbUser =>{
                if(!dbUser){
                    res.status(422).json({error:"invalid email"})
                }
                else{
                    bcrypt.compare(password,dbUser.password)
                          .then(doMatch =>{
                            if(doMatch){
                                const token = jwt.sign({id:dbUser._id},SECRETKEY)
                                res.json({token})
                            }
                            else{
                                res.status(422).json({error:"invalid password"})
                            }
                          })  
                }

            })
    }
})

router.get("/protected",requireLogin,(req,res)=>{
   res.json(req.user)
})

module.exports = router