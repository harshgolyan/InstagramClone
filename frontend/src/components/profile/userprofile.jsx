import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LeftNavbar from "../mainscreen/leftnavbar";

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
            setUser(data.user)
            setPost(data.posts)
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
    <div className="grid grid-cols-12">
        <div className="text-2xl col-span-3 m-5">Instagram</div>
        <div className="grid col-span-6"></div>
        <div className="text-2xl col-span-3"></div>
    </div>
    <div className="grid grid-cols-12">
        <div className="grid col-span-3"><LeftNavbar/></div>
        <div className="grid col-span-6">
            <div className="grid grid-flow-col">
                <img 
                className="h-20 w-20 rounded-full"
                src="https://images.unsplash.com/photo-1682687221323-6ce2dbc803ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"/>
                    <div className="grid grid-flow-col">
                        <div className="text-black text-2xl">{user.name}</div>
                        {(!isfollowed)?<button 
                        className="bg-blue-500 p-4 pt-1 pb-1 rounded-md h-10 w-40 text-white"
                        onClick={follow}
                        >Follow</button>:
                        <button 
                        className="bg-slate-300 p-4 pt-1 pb-1 rounded-md h-10 w-40 text-white"
                        onClick={follow}
                        >Follow</button>}
                        <button className="bg-slate-500 p-4 pt-1 pb-1 rounded-md h-10 w-40 text-white">Message</button>
                    </div>
            </div>     
        </div>
        <div className="grid col-span-3"></div>
    </div>
    </>
}

export default UserProfile;