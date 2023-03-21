import Header from "./components/Header";
import React, { useEffect } from "react";
import Auth from "./components/Auth";
import { Routes,Route } from "react-router-dom";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetails from "./components/BlogDetails";
import AddBlogs from "./components/AddBlogs";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
function App() { 
  const dispath=useDispatch();
  const isLoggedIn =useSelector((state)=>state.isLoggedIn)
  console.log(isLoggedIn);
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispath(authActions.login())
    }
  },[dispath])
  return <React.Fragment>
    <header>
      <Header></Header>
    </header>
    <main>
      <Routes>
        {!isLoggedIn?
        <Route path="/" element={<Auth/>}></Route>:
        <>
        <Route path="/blogs" element={<Blogs/>}></Route>
        <Route path="/myBlogs" element={<UserBlogs/>}></Route>
        <Route path="/myBlogs/:id" element={<BlogDetails/>}></Route>
        <Route path="/blogs/add" element={<AddBlogs/>}></Route>
        </>
        }
      </Routes>
    </main>
  </React.Fragment>;
}

export default App;
