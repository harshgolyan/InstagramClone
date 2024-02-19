import React from "react";
import {BrowserRouter,Route, Routes} from "react-router-dom";
import Signup from "./components/auths/signup";
import Login from "./components/auths/login";
import MainScreen from "./components/mainscreen/mainscreen";


const App  = () =>{
  return<>
<BrowserRouter>
<Routes>
  <Route path="/" element={<Signup/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/mainscreen" element={<MainScreen/>}/>
</Routes>
</BrowserRouter>

</>
}

export default App;