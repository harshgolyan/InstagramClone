import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () =>{
    const [title,setTitle] = useState('')
    const [body,setBody] = useState('')
    const [pic,setPic] = useState('')
    const navigate = useNavigate()

    const onSubmitHandler = (e) =>{
        e.preventDefault()

        fetch('http://localhost:4000/createPost',{
            method:'post',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem('jwt')
            },
            body:JSON.stringify({title,body,pic})
        })
        .then(res =>res.json())
        .then(data => {
            if(data.msg === 'post created successfully'){
                navigate('/mainscreen')
            }
        })
    }
    return<>
    <form onSubmit={onSubmitHandler}>
    <div class="grid place-items-center h-screen">
        <div class="grid place-content-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-10 rounded-lg">
            <h1>title</h1>
                <input type="text" class="m-3 rounded-lg" value={title} onChange={e => setTitle(e.target.value)}/>
            <h1>body</h1>
                <input type="text" class="m-3 rounded-lg" value={body} onChange={e => setBody(e.target.value)}/>
            <h1>pic</h1>
                <input type="text" class="m-3 rounded-lg" value={pic} onChange={e => setPic(e.target.value)}/>
                <button class="bg-blue-500 text-white font-bold py-1 px-3 m-3 rounded">
                create post
                </button>
        </div>
    </div>
    </form>
    
    </>
}
export default CreatePost;