const express = require('express')
const User  = require('../models/user')
const Post = require('../models/post')
const requirelogin = require('../middleware/requireLogin')
const router = express.Router()

//fetch info of user

router.get("/user/:id", requirelogin, (req, res) => {
    User.findOne({ _id: req.params.id })
        .select("-password")
        .then(user => {
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            return Post.find({ postedBy: req.params.id })
                .populate("postedBy", "_id name")
                .exec();
        })
        .then((user,posts) => {
            return res.status(200).json({ user,posts });
        })
        .catch(err => {
            return res.status(422).json({ error: err });
        })
})

//follow

router.put("/follow",requirelogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            res.status(422).json({error:err})
        }
        else{
            User.findByIdAndUpdate(req.user._id,{
                $push:{following:req.body.followId}
            },{
                new:true
            })
            .then(results =>res.json({results,result}))
        }
    })
})

//unfollow

router.put("/unfollow",requirelogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $pull:{followers:req.user._id}
    },{
        new:true
    },(err,result)=>{
        if(err){
            res.status(422).json({error:err})
        }
        else{
            User.findByIdAndUpdate(req.user._id,{
                $pull:{following:req.body.followId}
            },{
                new:true
            })
            .then(results =>res.json({results,result}))
        }
    })
})


    



module.exports = router