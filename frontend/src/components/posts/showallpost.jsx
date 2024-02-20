import React, { useEffect, useState } from "react";
import Postpage from "./postpage";

const ShowAllPost = () => {
    console.log("show all post")
    const [post,setPost] = useState([])


    useEffect(()=>{
        fetch('http://localhost:4000/showAllPost',{
            method:'get',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            }
        })
        .then(res => res.json())
        .then(data => setPost(data))
    },[])
   
    return<>
    {post.map((item,idx) => <Postpage postInfo={item} key={idx}/>)}

    </>
}
export default ShowAllPost;