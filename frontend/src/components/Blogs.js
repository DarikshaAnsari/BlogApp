import React, { useEffect, useState } from 'react'
import Blog from './Blog';
 import axios from 'axios'
 const Blogs = () => {
    const [blogs,setBlogs]=useState();
   useEffect(()=>{ 
    axios.get("http://localhost:9000/api/blog").catch((err)=>console.log(err)).then((res)=>{setBlogs(res.data)});
   },[])
   //console.log(blogs);
  return (
    <div>
     {blogs && blogs.map((blog,index)=>{
      return <Blog id={blog._id} isUser={localStorage.getItem("userId")===blog.user._id} title={blog.title} description={blog.description} imageURL={blog.image} userName={blog.user.name}/>
      })}
      
    </div>
  )
}

export default Blogs
