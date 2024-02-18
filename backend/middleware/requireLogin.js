const jwt = require('jsonwebtoken')
const {SECRETKEY} = require('../keys')
const User = require('../models/user')

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        res.status(401).json({error:"You must be logged in"})
    }
    else{
        const token = authorization.replace("Bearer ","")
        jwt.verify(token,SECRETKEY,(err,payload)=>{
            if(err){
                res.status(401).json({error:"you must be logged in"})
            }
            else{
                const {id} = payload

                User.findById(id)
                    .then(userData =>{
                        userData.password = undefined
                        console.log(userData)
                        req.user = userData
                        next()
                    })
            }
        })

    }
}
    

