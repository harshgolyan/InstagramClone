const express = require('express')
const router = express.Router()
const requireLogin = require('../middleware/requireLogin')
const Post = require('../models/post')


//create post
router.post("/createPost",requireLogin,(req,res)=>{
    const{title,body,pic} = req.body

    if(!title || !body || !pic){
        res.status(422).json({error:"add all require fields"})
    }
    else{
        const post = new Post({title,body,photo:pic,postedBy:req.user})
        post.save()
            .then(result=>{
                res.status(200).json({msg:"post created successfully"})
            })

    }
})

//show all posts
router.get("/showAllPost",requireLogin,(req,res)=>{
    Post.find()
        .populate("postedBy","_id name")
        .then(posts =>{
            res.json(posts)
        })
})

//show my posts
router.get("/myPost",(req,res)=>{
    console.log(req.user)
    Post.find({postedBy:req.user._id})
        .populate("postedBy","_id name")
        .then(mypost =>{
            res.json(mypost)
        })
})

//likes

router.put("/like",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    })
    .then(result =>{
        res.json(result)
    })
})

//dislikes

router.put("/dislike",requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .then(result => {
        res.json(result)
    })
})

//comments

router.put("/comment",requireLogin,(req,res)=>{
    const Comment={
        text:req.body.text,
        postedBy:req.user._id

    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:Comment}
    },{
        new:true
    })
    .populate("comments.postedBy","name")
    .populate("postedBy","name")
    .then(result =>res.json(result))

})

module.exports = router