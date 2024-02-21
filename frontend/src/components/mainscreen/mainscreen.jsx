import React from "react";
import Postpage from "../posts/postpage";
import LeftNavbar from "./leftnavbar";
import TopNavbar from "./topnavbar";
import ShowAllPost from "../posts/showallpost";

const MainScreen = () =>{
    return<>
     <div className="grid grid-cols-12">
        <div className="text-2xl col-span-3 m-5">Instagram</div>
        <div className="grid col-span-6"><TopNavbar/></div>
        <div className="text-2xl col-span-3"></div>
    </div>
    <div className="grid grid-cols-12">
        <div className="grid col-span-3"><LeftNavbar/></div>
        <div className="grid col-span-6"><ShowAllPost/></div>
        <div className="grid col-span-3"></div>
    </div>
    </>
}

export default MainScreen;