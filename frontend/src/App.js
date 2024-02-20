import React from "react";
import {BrowserRouter,Route, Routes} from "react-router-dom";
import Signup from "./components/auths/signup";
import Login from "./components/auths/login";
import MainScreen from "./components/mainscreen/mainscreen";
import CreatePost from "./components/posts/createpost";
import ShowAllPost from "./components/posts/showallpost";


const App  = () =>{
  return<>
<BrowserRouter>
<Routes>
  <Route path="/" element={<Signup/>}/>
  <Route path="/login" element={<Login/>}/>
  <Route path="/createpost" element={<CreatePost/>}/>
  <Route path="/mainscreen" element={<MainScreen/>}/>
  <Route path="/showallpost" element={<ShowAllPost/>}/>
</Routes>
</BrowserRouter>

</>
}

export default App;