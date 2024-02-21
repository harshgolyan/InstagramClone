import React, { useState } from "react";
import { HeartIcon,ChatIcon,ShareIcon } from '@heroicons/react/outline';


const Postpage = ({postInfo}) =>{
   
    return<>
    <div className="flex flex-col bg-grey-600 p-3 border-slate-950">
        <div className="p-3 rounded-md mx-auto ">
            <img src={postInfo.photo}
            className="rounded-md"/>
            <div className="flex flex-row mt-2">
            <HeartIcon className="h-8 w-8 text-black-500 m-2" />
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