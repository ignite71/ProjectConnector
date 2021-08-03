import React from 'react'
import {Grid,Paper, Avatar, TextField, Button, Typography,Link ,makeStyles, InputLabel, FormHelperText } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useState , useContext} from 'react';

import {useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import M from 'materialize-css'
import { UserContext } from '../../App';
// 

let i = 0
const useStyles = makeStyles((theme) => ({
   
    paperStyle:
    {   padding :20,
        height:'70vh',
        width:280, 
        margin:"20px auto"},
    
    avatarStyle:{
        backgroundColor:'#1bbd7e'
    },
    btnstyle:{
        margin:'8px 0'
    },
   
    link:{
        textDecoration:'none',
      
        color:'#878787'
    }

  }))

const Login=()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPassword] = useState(undefined)
    const [email,setEmail] = useState(undefined)




const handleEmail =(event)=>{
    console.log(event.target.value)
    setEmail(event.target.value)
}
const handlePassword =(event)=>{
    console.log(event.target.value)
    setPassword(event.target.value)
}
const handleSub=()=>{
    uploadFields()
    
}


    const classes = useStyles();

  



   
 



    const PostData = ()=>{
        
            uploadFields()
        
       
    }


      
     const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
               
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
               M.toast({html:"signedin success",classes:"#43a047 green darken-1"})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }








    return(
        <Grid>
            
            <Paper elevation={10}  className = {classes.paperStyle}>
                <Grid align='center'>
                     <Avatar  className = {classes.avatarStyle}><LockOutlinedIcon/></Avatar>
                   <Typography variant='h3' color='secondary'>Sign In</Typography>
                </Grid>
             
             <TextField label='Email' 
                 color='secondary'
                 placeholder='Enter Email'
                 fullWidth required
                 name = "Email"
                 variant='outlined'
                value= {email}
                onChange={handleEmail}
                style={{margin:'20px 20px 0 0 '}}
                 />
       





               <TextField label='Password' 
                 
                 placeholder='Enter Password'
                 fullWidth required
                 name = "Pass"
                value= {password}
                variant='outlined'
                color='secondary'
                onChange={handlePassword}
                style={{margin:'20px 20px 0 0 '}}
                 />
                



                <Button type='submit' color='secondary' variant="contained"   className = {classes.btnstyle} fullWidth
                onClick={()=>PostData()}
                >Sign in</Button>
              
                <Typography variant='subtitle1' color='error'> Don't have account ?
                     <Link href="/signup" className={classes.link}>
                        Sign Up
                </Link>
                </Typography>

           </Paper>
            
        </Grid>
    )
}

export default Login