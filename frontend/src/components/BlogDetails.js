import React, { useEffect, useState } from 'react'
import { Box,Button,InputLabel, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { useStyles } from './utils'
const labelStyle={mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}
const BlogDetails = () => {
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({})
  const handleChange=(e)=>{
    setInputs((prev)=>
    ({
      ...prev,[e.target.name]:e.target.value
    }))
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then((data)=>console.log(data)).then(navigate("/myBlogs"));
  }
  const [blog,setBlog]=useState({});
  const id=useParams().id;
  console.log(id);
  const fetchDetails = async()=>{
    const res= await axios.get(`http://localhost:9000/api/blog/${id}`).catch((err)=>console.log(err))
    const data=await res.data;
    return data;
  }
  useEffect(()=>{
    fetchDetails().then((data)=>{setBlog(data.blog)
      setInputs({title:data.blog.title,description:data.blog.description})})
    },[id])
    const sendRequest=async()=>{
      const res= await axios.put(`http://localhost:9000/api/blog/update/${id}`,{
        title:inputs.title,
        description:inputs.description,
      }).catch((err)=>console.log(err))
      const data=await res.data;
      return data;
    }
   console.log(blog);
  return (
    <div>
      {inputs &&
   <form onSubmit={handleSubmit}>
      <Box border={3} borderColor='linear-gradient(to right, #000428, #004e92)' borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={'auto'} marginTop={6} display='flex' flexDirection={'column'} width='60%'>
        <Typography fontWeight={'bold'} padding={3} color='grey' variant='h3' textAlign={'center'} >Post Your Blog</Typography>
        <InputLabel sx={labelStyle}>Title</InputLabel>
        <TextField name='title' onChange={handleChange} margin='normal' variant='outlined' value={inputs.title}></TextField>
        <InputLabel sx={labelStyle}>Description</InputLabel>
        <TextField name='description' onChange={handleChange} margin='normal' variant='outlined' value={inputs.description}></TextField>
        <Button type='submit' sx={{mt:2,borderRadius:4}} variant='contained'>Submit</Button>
      </Box>
     </form>}
    </div>
  
  )
}

export default BlogDetails
