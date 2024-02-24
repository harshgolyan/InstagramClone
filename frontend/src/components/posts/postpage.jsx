import React, { useState } from "react";
import { HeartIcon,ChatIcon,ShareIcon } from '@heroicons/react/outline';
import {HeartIcon as SolidHeartIcon} from "@heroicons/react/solid";


const Postpage = ({postInfo}) =>{
    const [liked,setLiked] = useState(false)
    const [post,setPost] = useState(null)
    

   const onLikeHandler = () =>{
    console.log('like karo')
    if(liked === false){
        fetch('http://localhost:4000/like',{
            method:'put',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            },
            body:JSON.stringify({postId : postInfo._id})
        })
        .then(res => res.json())
        .then(data => {
            setPost(data)
        })
        setLiked(true)
    }

    else{
        fetch('http://localhost:4000/dislike',{
            method:'put',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            },
            body:JSON.stringify({postId : postInfo._id})
        })
        .then(res => res.json())
        .then(data => {
            setPost(data)
        })
        setLiked(false)
    }

    }
    
   
    return<>
    <div className="flex flex-col bg-grey-600 p-3 border-slate-950">
        <div className="p-3 rounded-md mx-auto ">
            <img src={postInfo.photo}
            className="rounded-md"/>
            <div className="flex flex-row mt-2">
            {(!liked) ?
            (<HeartIcon onClick={onLikeHandler} className="h-8 w-8 text-black-500 m-2"/>):
            (<SolidHeartIcon onClick={onLikeHandler} className="h-8 w-8 text-red-500 m-2"/>)
             }
            <ChatIcon className="h-8 w-8 text-black-500 m-2" />
            <ShareIcon className="h-8 w-8 text-black-500 m-2" />
        </div>
            <h1>title :{postInfo.title}</h1>
            <p>body of title :{postInfo.body}</p>
        </div>
            

    </div>
    </>
}

export default Postpage;