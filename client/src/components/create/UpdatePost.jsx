
import React, { Image, useState, useEffect, useContext } from 'react';
import { MenuItem, TextField, Box, makeStyles, TextareaAutosize, Button, FormControl, InputBase, Grid } from '@material-ui/core';
import { AddCircle as Add } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { categories } from '../../constants/data';

import M from 'materialize-css'
import { useParams } from 'react-router';
import { UserContext } from '../../App';


const useStyle = makeStyles(theme => ({

   
    container: {
        margin: '50px 100px',
        [theme.breakpoints.down('md')]: {
            margin: 0
        },
    },
    image: {
        width: '100%',
        marginTop:'10px',
        height: '50vh',
        objectFit: 'contain'

    },
    title: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    textfield: {
        flex: 1,
        margin: '0 30px',
        fontSize: 25
    },
    textarea: {
        width: '100%',
        border: 'none',
        marginTop: 50,
        fontSize: 18,
        '&:focus-visible': {
            outline: 'none'
        }
    },
 
    select:{
        minWidth:'100%',
        maxWidth: '100%'
    }
}));




const Createview =()=>{
    const [title,setTitle] = useState("")
    const [body,setBody] = useState("")
    const [image,setImage] = useState("")
    const [initimage,setInitImage] = useState("")
    const [url,setUrl] = useState("")

    const [category,setCategory] = useState("")
    const [post ,setPost] = useState([])
    const {state,dispatch} = useContext(UserContext)
    
    const handleCategory =(event)=>{
      setCategory(event.target.value)
      console.log(event.target.value)
    }
    const {id} = useParams()


    const getPost = async (id) => {
        try {
            const url = `/post/${id}`
            const response = await fetch(url)
            const result = await response.json()
            setBody(result.posts.body)
            setTitle(result.posts.title)
            setImage(result.posts.photo)
            setInitImage(result.posts.photo)
            setCategory(result.posts.category)
            setPost(result.posts);
           
            console.log(result.posts)
         if(state?._id!==result.posts.postedBy._id){
             history.push('/')
         }
            

            
          
            
        } catch (error) {
           
            console.log("my error is "+ error);
        }
    }






    useEffect(() => {
        const fetchData = async () => {
           await getPost(id);
            
        }
       fetchData()
        // console.log(account, post.username);
        
    }, []);

    useEffect(()=>{
        if(url){
         fetch(`/update/${id}`,{
             method:"put",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                 title,
                 body,
                 category,
                 photo:url
             })
         }).then(res=>res.json())
         .then(data=>{
   
            if(data.error){
               M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"Udated post Successfully",classes:"#43a047 green darken-1"})
                history.push(`/details/${id}`)
            }
         }).catch(err=>{
             console.log(err)
         })
     }
     },[url])
     const postDetails = ()=>{
         if(initimage.toString()!==image.toString())
       { const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","kapoor")
        fetch("	https://api.cloudinary.com/v1_1/kapoor/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
           console.log(data);
        })
        .catch(err=>{
            console.log(err)
        })
       }
       else{
        setUrl(initimage)

       }
          
 
        }
    
    const checksize = (size)=>{
        if(size&&size<2000){
            // postDetails()
        }else{
            M.toast({html: "Size must be less than 2mb",classes:"#c62828 red darken-3"})
        }
    }

     





    


    const classes =  useStyle()
    const history = useHistory();
 

    return (
        
        <Box className={classes.container}> 
 
        <img src={initimage} alt="Image" className={classes.image} />

            <FormControl className={classes.title}>
            <label htmlFor="fileInput">
                    <Add className={classes.addIcon} fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => 
                        {
                            setImage(e.target.files[0])
                       
                            checksize(e.target.files[0].size)

                    }
                }
                />

                <InputBase 
                onChange={(e) => setTitle(e.target.value)} 
                value={title}
                 name='title' placeholder="Title"  className={classes.textfield} />
                <Button 
                onClick={() => postDetails()}
                  variant="contained" color="primary">Publish</Button>
            </FormControl>
            
            <TextField
          id="standard-select-category"
          select
          label="Select your category"
          name = "category"
          value={category}
          onChange={handleCategory}
          className={classes.select}
          
          
     
        >
          {categories.map((option) => (
            <MenuItem key={option } value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
            

            <TextareaAutosize
                rowsMin={5}
                placeholder="Tell your story..."
                className={classes.textarea}
                name='description'
                value={body}
                onChange={(e) => setBody(e.target.value)} 
            />

            

        </Box>
       
    )
}
// 
export default Createview