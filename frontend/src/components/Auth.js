import { Button, TextField, Typography,Box } from '@mui/material'
import React, { useState} from 'react'
import {useDispatch} from 'react-redux'
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { authActions } from '../store'

const Auth = () => {
  const navigate=useNavigate();
  const dispath=useDispatch();
  const[isSignup,setIsSignup]=useState(false);
  const [inputs,setInputs]=useState({
    name:"",
    password:"",
    email:""
  })
  const handleChange=(e)=>{
    setInputs((prev)=>
    ({
      ...prev,[e.target.name]:e.target.value
    }))
  }
  const sendRequest=async(type='login')=>{
    const res =await axios.post(`http://localhost:9000/api/user/${type}`,{
      name:inputs.name,
      email:inputs.email,
      password:inputs.password
    }).catch((err)=>{console.log(err)})

    const data =await res.data;
    return data;
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(inputs)
    if(isSignup){
    sendRequest("signup").then((data)=>{localStorage.setItem("userId",data.user._id)}).then(()=>dispath(authActions.login())).then(()=>{navigate("/blogs")}).then(data=>console.log(data))}
    else{
      sendRequest().then((data)=>{localStorage.setItem("userId",data.user._id)}).then(()=>dispath(authActions.login())).then(()=>{navigate("/blogs")}).then(data=>console.log(data));
    }
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection={'column'} alignItems='center' justifyContent='center' boxShadow={"10px 10px 20px #ccc"} maxWidth={400} margin='auto' padding={3} marginTop={5} borderRadius={5}>
            <Typography variant='h3' padding={3} textAlign={'center'}>{isSignup?"Signup":"Login"}</Typography>
            {isSignup && <TextField name='name' value={inputs.name} onChange={handleChange} placeholder="Name" margin={'normal'}></TextField>}
            <TextField name='email' value={inputs.email} onChange={handleChange} type='email' placeholder="Email" margin={'normal'}></TextField>
            <TextField name='password' value={inputs.password} onChange={handleChange} type='password' placeholder="Password" margin={'normal'}></TextField>
            <Button sx={{borderRadius:3 ,marginTop:3}} variant='contained' type='submit'>Submit</Button>
            <Button sx={{borderRadius:3 ,marginTop:1}} onClick={()=>{setIsSignup(!isSignup)}}>{isSignup?"Already a user?":"Want to be User?"}</Button>
          </Box>
        </form>
    </div>
  )
}

export default Auth