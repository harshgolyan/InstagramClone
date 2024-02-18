import React from "react";
import {BrowserRouter ,Route, Routes} from "react-router-dom";
import Signup from "./components/auths/signup";
import Login from "./components/auths/login";


const App  = () =>{
  return<>
{/* <Signup/> */}
  <Login/>
  </>
}

export default App;