import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UserProfile = () =>{
    const [user,setUser] = useState({})
    const [post,setPost] = useState([])
    const [isfollowed,setIsFollowed] = useState(false)
    const [follower,setFollower] = useState({ user: { followers: [] } })
    const navigate = useNavigate()

    //id fetching from navigate
    const location = useLocation()
    const id = location.state ? location.state.id : ''

    useEffect(()=>{
        fetch(`http://localhost:4000/user/${id}`,{
            method:"get",
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
        })
          .then(res=>res.json())
          .then(data =>{
            console.log(data.user)
            console.log(data.posts)
          })
    },[])

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
    
    return<>
    <div> 
        <button className="bg-blue-200 p-2" onClick={follow}>Follow</button>
    </div>
    </>
}

export default UserProfile;