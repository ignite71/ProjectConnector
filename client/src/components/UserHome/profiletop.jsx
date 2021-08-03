import React from 'react'
import {IconButton,Grid, Avatar,  Button, Typography,makeStyles } from '@material-ui/core'
import {  FormControl } from '@material-ui/core';

import { useEffect,useState , useContext} from 'react';


import M from 'materialize-css'
import { UserContext } from '../../App';

import Typed from "react-typed"
import { AddCircle as Add, AddCircle, CallEnd } from '@material-ui/icons';
import { useHistory } from 'react-router';


let i = 0
const useStyles = makeStyles((theme) => ({
   
   avatar:{
      width:theme.spacing(30),
      height: theme.spacing(18),
      margin:theme.spacing(1),
      objectFit:'scale-down'
   },
   textgrid:{

    [theme.breakpoints.up('md')]: {
        marginTop:"3rem"
      },
   

   },
   title:{
       color:"tomato",
       marginLeft:"1rem"
       
       
   },
   subtitle:{
       color:"tan",
       marginBottom:"3rem",
       marginLeft:"1rem"
   },
   typedContainer:{
   position:"relative",
   top:"15em",
   left:"50%",
   transform:"translate(-50%,-50%)",
   width:"100vw",
   textAlign:"center",
//    zIndex:1
   },
   top:{
    position:"relative",
   },
   link: {
    textDecoration: 'none',
    color: 'inherit'
},
   

  }))

const ProfileTop=()=>{
    const classes = useStyles()

    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    const [url,setUrl] = useState("")

    const [userProfile,setProfile] = useState(null)

    useEffect(()=>{
        fetch(`/user/${state?._id}`,
  
        ).then(res=>res.json())
        .then(result=>{
            console.log(result.posts)
          
             setProfile(result.posts)
        })
     },[])

    useEffect(()=>{
        if(url){
            fetch('/updatepic',{
                method:"put",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    pic:url
                })
            }).then(res=>res.json())
            .then(result=>{
                console.log(result)
                localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                dispatch({type:"UPDATEPIC",payload:result.pic})

            })
     }
     },[url])



    const postDetails = ()=>{
        const data = new FormData()
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



  
    const updatePhoto = (file)=>{
        setImage(file)
        console.log(file)
    }
    const checksize = (size)=>{
        if(size&&size<2000){
            // postDetails()
        }else{
            M.toast({html: "Size must be less than 2mb",classes:"#c62828 red darken-3"})
        }
    }
   const history = useHistory()
    const followers =()=>{
        history.push(`/followers/${state?._id}`)
    }
    const following =()=>{
        history.push(`/following/${state?._id}`)
    }



    return(
       
            <>
        
            <Grid 
            container
             spacing ={3}
              xs={12}>
                <Grid item sm ={1} xs={12}>

                </Grid>
                <Grid  container item sm ={5} xs={12}>
                <Grid container justify="center" spacing={3}>
                     <Avatar src={state?state.pic:"loading"} style ={{margin: 60}} className={classes.avatar}/>
                </Grid>

                </Grid>
                <Grid container item sm ={5}  xs={12}>
                <Grid container justify="center"  alignItems="center" direction="column" 
                className={classes.textgrid}
                // 
                >
                    <Grid item>
                        {/* <Typography inline>CPU</Typography> */}
                    </Grid>
                    <Grid container item >
                       <Grid item xs ={6}>
                       <IconButton className={classes.button} aria-label="Add" size="medium" inline
                       onClick={followers}
                       >
                         
                           Followers {userProfile?.followers.length}
                           </IconButton>
                       </Grid>
                       <Grid item xs ={6}>
                          
                       <IconButton className={classes.button} aria-label="Add" size="medium"  inline
                         onClick={following}>
                       Following {userProfile?.following.length}</IconButton>
                       </Grid>
                       
                    </Grid>
                    <Grid container item>
                
                        <Grid item xs  ={6}>
                        <Typography variant="h4">
                      <Typed strings={[state?.name]} typeSpeed={40} className={classes.title} />
               

                         </Typography>
                    
                        </Grid>
                        <Grid item xs  ={6}>
                            
                        </Grid>

                   
                    </Grid>
                    <Grid container item >
                        <Grid item xs={6}>
                      <Typography variant="h5" className={classes.subtitle}>
                      <Typed 
                      strings={[state?.branch,state?.email,state?.college]} 
                       typeSpeed={40} 
                       backSpeed={60}
                      loop
                        />


                </Typography>
                   
                        </Grid>
                        <Grid item xs={6}>
                            
                        </Grid>
                    
                    </Grid>
                    
                </Grid>
              
                </Grid>
                <Grid item xs={12} sm ={1}>
               
                </Grid>
            </Grid>
            <Grid 
            container
             spacing ={3}
              xs={12}>
                  <Grid item  xs={3}>

                 </Grid>
                 <Grid item  xs={3}>

                 </Grid>
                 <Grid  container item  xs={3}>
                 
                 <FormControl className={classes.title}>
                     <Grid container item xs={12}>
                     <Grid item  xs={6}>
            <label htmlFor="fileInput">
                    <Add className={classes.addIcon} fontSize="large" color="action" />
                </label>
                
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => 
                        {
                            updatePhoto(e.target.files[0])
                            // console.log(e.target.files[0])
                            checksize(e.target.files[0].size)

                    }
                }
                />

                </Grid>
                   <Grid item  xs={6}>
                <Button 
                onClick={() => postDetails()}
                  variant="contained" color="primary">UploadPic</Button>
               </Grid>
               </Grid>
                 
                 
                  </FormControl>
               


                 </Grid>
                 <Grid item  xs={3}>

                 </Grid>


          

              </Grid>
      
            </>
   
     
    )
}

export default ProfileTop