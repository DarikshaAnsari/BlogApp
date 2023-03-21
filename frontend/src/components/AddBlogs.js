import { Box,Button,InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useStyles } from './utils'
const labelStyle={mb:1,mt:2,fontSize:'24px',fontWeight:'bold'}
const AddBlogs = () => {
  const classes=useStyles();
  const navigate=useNavigate();
  const [inputs,setInputs]=useState({
    title:"",
    description:"",
    imageURL:""
  })
  const handleChange=(e)=>{
    setInputs((prev)=>
    ({
      ...prev,[e.target.name]:e.target.value
    }))
  }
  const sendRequest= async()=>{
    const res =await axios.post("http://localhost:9000/api/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user:localStorage.getItem('userId')
    }).catch(err=>console.log(err));
    const data =await res.data;
    return data;
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(()=>{navigate("/blogs")});
  }
  return (
    <div>
     <form onSubmit={handleSubmit}>
      <Box border={3} borderColor='linear-gradient(to right, #000428, #004e92)' borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={'auto'} marginTop={6} display='flex' flexDirection={'column'} width='60%'>
        <Typography fontWeight={'bold'} padding={3} color='grey' variant='h3' textAlign={'center'} className={classes.font}>Post Your Blog</Typography>
        <InputLabel sx={labelStyle} className={classes.font}>Title</InputLabel>
        <TextField name='title' onChange={handleChange} margin='normal' variant='outlined' className={classes.font}></TextField>
        <InputLabel sx={labelStyle} className={classes.font}>Description</InputLabel>
        <TextField name='description' onChange={handleChange} margin='normal' variant='outlined' className={classes.font}></TextField>
        <InputLabel sx={labelStyle} className={classes.font}>ImageURL</InputLabel>
        <TextField name='imageURL' onChange={handleChange} margin='normal' variant='outlined' className={classes.font}></TextField>
        <Button type='submit' sx={{mt:2,borderRadius:4}} variant='contained' className={classes.font} >Submit</Button>
      </Box>
     </form>
    </div>
  )
}

export default AddBlogs
