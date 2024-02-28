import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UserProfile = () =>{
    const [user,setUser] = useState({})
    const [post,setPost] = useState({})
    const [isfollowed,setIsFollowed] = useState(false)
    const [follower,setFollower] = useState({ user: { followers: [] } })

    //id fetching from navigate
    const location = useLocation()
    const id = location.state ? location.state.id : ''
    console.log(id)

    //follow functionality
    const follow = () =>{
        if(isfollowed === false){
            fetch('http://localhost:4000/follow',{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem('jwt')
                },
                body:JSON.stringify({followId:id})
            })
            .then(res =>res.json())
            .then(data =>{
                setFollower(data)
            })
            setIsFollowed(true)
        }
        else{
            fetch('http://localhost:4000/unfollow',{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem('jwt')
                },
                body:JSON.stringify({followId:id})
            })
            .then(res => res.json())
            .then(data => {
                setFollower(data)
            })
            setIsFollowed(false)
        }
    }
    

    useEffect(()=>{
        fetch(`http:/localhost:4000/user/${id}`,{
        method:"get",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem('jwt')
        },
    })
    .then(res =>res.json())
    .then(data =>{
        setUser(data.user)
        setPost(data.posts)
    })
},[])
    return<>
    <div> 
        <button className="bg-blue-200" onClick={follow}>Follow</button>
        <h1>{user.name}</h1>
        <h1>{follower.length}</h1>
    </div>
    </>
}

export default UserProfile;