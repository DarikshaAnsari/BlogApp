import React from 'react'
import {Box,Avatar,Card,CardContent,CardHeader,CardMedia,Typography, IconButton} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './utils'
import axios from 'axios';
const Blog = ({title,description,imageURL,userName,isUser,id}) => {
  
  const classes=useStyles();
    const navigate=useNavigate();
    const handleedit=(e)=>{
        navigate(`/myBlogs/${id}`); 
    }
    const deleteRequest=async()=>{
      const res =await axios.delete(`http://localhost:9000/api/blog/${id}`).catch((err)=>{console.log(err)})
      const data =await res.data;
      return data;
    }
    const handleDelete=()=>{
       deleteRequest().then(navigate("/")).then(navigate('/blogs'));
    }
    console.log(title,isUser);
    return (
    <>
    <Card sx={{width:"40%",margin:'auto',mt:2,padding:2,boxShadow:"5px 5px 10px #ccc",":hover":{boxShadow:'10px 10px 20px #ccc'}}}>
        {
          isUser && (
              <Box display={'flex'}>
                  <IconButton sx={{ml:'auto'}} onClick={handleedit}  color='warning'><EditIcon></EditIcon></IconButton>
                  <IconButton onClick={handleDelete}  color='warning'><DeleteIcon></DeleteIcon></IconButton>
              </Box>
          )
        }
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe" className={classes.font}>
            {userName.charAt(0)}
          </Avatar>
        }
        title={title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="Paella dish"
      />
      <CardContent>
      <hr></hr>
      <br></br>
        <Typography variant="body2" color="text.secondary" className={classes.font}>
          <b>{userName}</b>{":"}{description}
        </Typography>
     </CardContent>
    </Card>
    </>
  );
}

export default Blog
