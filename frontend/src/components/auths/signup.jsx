import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () =>{
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()

    const onSubmitHandler = (e) =>{
        e.preventDefault()
        fetch('http://localhost:4000/signup',{
            method:'post',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name,email,password})
        })
        .then(res => res.json())
        .then(data => {
            if(data.msg === 'new user added successfully'){
                navigate('/login')
            }
        })

    }

    return<>
    <form onSubmit={onSubmitHandler}>
    <div class="grid place-items-center h-screen">
        <div class="grid place-content-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-10 rounded-lg">
            <h1>Name</h1>
                <input type="text" class="m-3 rounded-lg" onChange={e => setName(e.target.value)}/>
            <h1>Email</h1>
                <input type="text" class="m-3 rounded-lg" onChange={e => setEmail(e.target.value)}/>
            <h1>Password</h1>
                <input type="text" class="m-3 rounded-lg" onChange={e => setPassword(e.target.value)}/>
                <button class="bg-blue-500 text-white font-bold py-1 px-3 m-3 rounded">
                Signup
                </button>
        </div>
    </div>
    </form>
    </>
}
export default Signup;