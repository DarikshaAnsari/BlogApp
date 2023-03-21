import React, { useState } from 'react'
import {AppBar,Button,Toolbar,Typography,Box, Tabs,Tab} from '@mui/material';
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { useSelector } from "react-redux";
import { authActions } from '../store';
import { useStyles } from './utils'
const Header = () => {
   const classes=useStyles();
   const isLoggedIn =useSelector((state)=>state.isLoggedIn)
   const [value,setValue]= useState();
   const dispath=useDispatch();
  return (
    <AppBar sx={{background:"linear-gradient(to right, #000428, #004e92)",height:'5rem',justifyContent:'center'}} position="sticky">
    <Toolbar variant="dense">
      <Typography variant="h4" color="inherit" component="div" className={classes.font}>
        BlogsApp
      </Typography>
      {isLoggedIn && <Box marginLeft="auto" marginRight="auto">
       <Tabs value={value} onChange={(e,val)=>{setValue(val)}} className={classes.font} textColor="inherit">
        <Tab LinkComponent={Link} to="/blogs" label="All Blogs" className={classes.font} ></Tab>
        <Tab LinkComponent={Link} to="/myblogs" label="My blogs" className={classes.font}></Tab>
        <Tab LinkComponent={Link} to="/blogs/add" label="Add blogs" className={classes.font}></Tab>
      </Tabs>
      </Box>}
      <Box display="flex" marginLeft="auto">
       {isLoggedIn && <Button variant="contained" sx={{margin:1 ,borderRadius:10}} LinkComponent={Link} to="/" onClick={()=>dispath(authActions.logout())}>Logout</Button>} 
      </Box>
    </Toolbar>
  </AppBar>
  )
}

export default Header
