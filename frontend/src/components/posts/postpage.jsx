import React from "react";
import { HeartIcon,ChatIcon,ShareIcon } from '@heroicons/react/outline';


const Postpage = () =>{
    return<>
    <div className="flex flex-col bg-grey-600 p-3 border-slate-950">
        <div className="p-3 rounded-md mx-auto ">
            <img src="https://images.unsplash.com/photo-1682695795255-b236b1f1267d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"
            className="rounded-md"/>
            <div className="flex flex-row mt-2">
            <HeartIcon className="h-8 w-8 text-black-500 m-2" />
            <ChatIcon className="h-8 w-8 text-black-500 m-2" />
            <ShareIcon className="h-8 w-8 text-black-500 m-2" />
        </div>
            <h1>title</h1>
            <p>body of title</p>
        </div>
            

    </div>
    </>
}

export default Postpage;