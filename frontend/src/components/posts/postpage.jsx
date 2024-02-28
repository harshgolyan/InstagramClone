import React, { useState } from "react";
import { HeartIcon,ChatIcon,ShareIcon } from '@heroicons/react/outline';
import {HeartIcon as SolidHeartIcon} from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";




const Postpage = ({postInfo}) =>{
    const [liked,setLiked] = useState(false)
    const [comment,setComment] = useState(null)
    const [commentList,setCommentList] = useState(null)
    const [post,setPost] = useState(null)
    const navigate = useNavigate()
    
    //like or dislike

    const onLikeHandler = () =>{
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

    //comment
    const onCommentHandler = (e) =>{
        e.preventDefault()
        console.log("comment")
        fetch('http://localhost:4000/comment',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":'Bearer ' + localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                text:comment,
                postId:postInfo._id
            })
        })
        .then(res =>res.json())
        .then(data => {
            console.log(data)
            setComment('')
        })
        
    }
    const userprofilehandler = () =>{
        navigate('/userprofile')
    }
    
    

    
   
    return<>
    <div className="flex flex-col bg-grey-600 p-3 border-slate-950">
        <div className="flex flex-row">
            <img className="rounded-full h-8 w-8"
            onClick={userprofilehandler}
            src="https://images.unsplash.com/photo-1707343848655-a196bfe88861?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"/>
            <div className="pl-3">{postInfo.postedBy.name}</div>
        </div>
        <div className="p-3 rounded-md mx-auto ">
            <img src={postInfo.photo}
            className="rounded-md"/>
            <div className="flex flex-row mt-2">
            {(!liked) ?
            (<HeartIcon onClick={onLikeHandler} className="h-8 w-8 text-black-500 m-2"/>):
            (<SolidHeartIcon onClick={onLikeHandler} className="h-8 w-8 text-red-500 m-2"/>)
             }
            <ChatIcon onClick={onCommentHandler} className="h-8 w-8 text-black-500 m-2" />
            <ShareIcon className="h-8 w-8 text-black-500 m-2" />
        </div>
            <h1>title :{postInfo.title}</h1>
            <p>body of title :{postInfo.body}</p>
            <div>
            <input type="text" placeholder="comment..." value={comment}
            className="border-black"
            onChange={(e) => setComment(e.target.value)}/>
            </div>
            <button onClick={onCommentHandler}>Post</button>
        </div>
            

    </div>
    </>
}

export default Postpage;