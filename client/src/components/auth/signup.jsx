import React from 'react'
import {MenuItem, Grid,Paper, Avatar, TextField, Button, Typography,Link ,makeStyles } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useEffect,useState } from 'react';

import { categories } from '../../constants/data';
import {useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import M from 'materialize-css'
// 


const useStyles = makeStyles((theme) => ({
   
    paperStyle:
    {   padding :20,
        height:'600px',
        width:280, 
        margin:"20px auto"},
    
    avatarStyle:{
        backgroundColor:'#1bbd7e'
    },
    btnstyle:{
        margin:'8px 0'
    },
    formcontrol:{
        margin: theme.spacing(1),
        minWidth:200
    },
    select:{
        minWidth:'85%',
        maxWidth: '80%'
    },
    link:{
        textDecoration:'none',
        color:'#878787'
    }

  }))

const Login=()=>{
  
    const history = useHistory()
    const [name,setName] = useState(undefined)
    const [password,setPassword] = useState(undefined)
    const [email,setEmail] = useState(undefined)


    const [college, setcollege] = React.useState("");
    const [smilo,setFufa] = React.useState([]);
    const { handleSubmit} = useForm()

    // Function
    const onSubmit = (data) => console.log(data);

  const handleChange = (event) => {
      console.log(event.target.value)
    setcollege(event.target.value);
  };

  const handlebranch =(event)=>{
      console.log(event.target.value)
      setbranch(event.target.value)
  }
  const handleName =(event)=>{
    console.log(event.target.value)
    setName(event.target.value)
}
const handleEmail =(event)=>{
    console.log(event.target.value)
    setEmail(event.target.value)
}
const handlePassword =(event)=>{
    console.log(event.target.value)
    setPassword(event.target.value)
}

    const [branch,setbranch] =  useState("al")
    const [value,setValue]=  useState()
    const classes = useStyles();
    const [data,setData] = useState([])
    const [submit,setSubmit] =  useState(undefined)



    let fufa = []
  
    let i = 0 

    const getUsers = async () => {
        try {
            const url = "https://raw.githubusercontent.com/MustansirZia/institutions-api/master/data/json/indian_universities.json"
            const response = await fetch(url)
            const result = await response.json()

            setData(result);
            // console.log(result)
            result.map(option=>{
                // console.log(option)
                fufa[i] = option["University Name"]
                i = i +  1

                
    
            })
            fufa.sort()
            setFufa(fufa)
            
            
        } catch (error) {
           
            console.log("my error is "+ error);
        }
    }

    
    useEffect(()=>{

        getUsers()
       
     },[])

    
    const PostData = ()=>{
        
            uploadFields()
        
       
    }



     const check =()=>{
         smilo.map(option=>{
             console.log(option)
             console.log(typeof(option))
         })
         categories.map(option=>{
             console.log(option)
         })
     }

      
     const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                branch,
                college
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:"signed",classes:"#43a047 green darken-1"})
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }








    return(
        <Grid>
            
            <Paper elevation={10}  className = {classes.paperStyle}>
                <Grid align='center'>
                     <Avatar  className = {classes.avatarStyle}><LockOutlinedIcon  /></Avatar>
                     <Typography variant='h3' color='secondary'>Sign Up</Typography>
                    
                </Grid>
             
                 <form onSubmit={handleSubmit(onSubmit)}>
                 
              
                <TextField label='Username' 
           
                  color='secondary'
                 placeholder='Enter username'
                 fullWidth required
                 name = "Username"
                value= {name}
                onChange={handleName}
                variant='outlined'
                style={{margin:'20px 20px 0 0 '}}
                 />
             <TextField label='Email' 
                  color='secondary'
                 placeholder='Enter Email'
                 fullWidth required
                 name = "Email"
                value= {email}
                onChange={handleEmail}
                variant='outlined'
                style={{margin:'20px 20px 0 0 '}}
                
                 />
          
          
            <TextField
             color='secondary'
            id="standard-select-college"
            select
            label="Select your college"
           name = "college"
           value={college}
           
           onChange={handleChange}
           className={classes.select}
           variant='outlined'
           style={{margin:'20px 20px 0 0 '}}
          
     
        >
          {smilo.map((option) => (
            <MenuItem key={option } value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
          

        <TextField
          color='secondary'
          variant='outlined'
          id="standard-select-branch"
          select
          label="Select your branch"
          name = "branch"
          value={branch}
          onChange={handlebranch}
          className={classes.select}
          style={{margin:'20px 20px 0 0 '}}
       
        >
          {categories.map((option) => (
            <MenuItem key={option } value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        









               <TextField
                label='Password' 
                 color='secondary'
                 variant='outlined'
                 placeholder='Enter Password'
                 fullWidth required
                 name = "Pass"
                value= {password}
                onChange={handlePassword}
                // style={{textDecorationColor:'none'}}
                style={{margin:'20px 20px 0 0 '}}
             
                 ></TextField>
                



                <Button type='submit' color='secondary' variant="contained"   className = {classes.btnstyle} fullWidth
                onClick={()=>PostData()}
                style={{margin:'20px 20px 0 0 '}}
                >Sign Up</Button>
                {/* <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography> */}
                <Typography color='secondary' variant='subtitle1'> Do you have an account ?
                     <Link href="/signin" className={classes.link}>
                        Sign In
                </Link>
                </Typography>
           </form> 
           </Paper>
            
        </Grid>
    )
}

export default Login