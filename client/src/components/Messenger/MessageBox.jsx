
import React, { Image, useState, useEffect, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {  TextareaAutosize,  IconButton, Box,MenuItem, Select ,Grid,Paper, Avatar, TextField, Button, Typography,Link ,makeStyles, InputLabel, FormHelperText } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { categories } from '../../constants/data';
import Persons from './Persons';
// import { createPost, uploadFile } from '../../service/api';
// import ProjectConnectors from './ProjectConnectors.png' 
import {io} from 'socket.io-client'
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import Message from './Message/Message';
import M from 'materialize-css'
// import Persons from './Persons';

const useStyle = makeStyles(theme => ({

   
    container: {
        margin: '50px 100px',
        [theme.breakpoints.down('md')]: {
            margin: 0
        },
    },
    image: {
        width: '100%',
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
    form : {
        display:'flex',
        flexDirection: 'row',
        marginTop: 10,
    },
    imagine: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    select:{
        minWidth:'100%',
        maxWidth: '100%'
    },
    chatMenu:{
     padding:10,
    

    },
    chatBox:{
        padding:10
    },
    chatOnline:{
        padding:10
    }

}));

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: 'manav',
    categories: 'All',
    createdDate: new Date()
}






const Messenger =()=>{
    const params = useParams()
    const ENDPOINT = 'localhost:3000'
    const classes =  useStyle()
    const history = useHistory();
    const [socket,setSocket] = useState(null)
    const {state,dispatch} = useContext(UserContext)
   useEffect(()=>{
      setSocket(io(ENDPOINT))
   },[])

   useEffect(()=>{
   socket ? ( socket.on("welcome",message=>{
       console.log(message)
    }) ):(<></>)
 },[socket])


    return (
        <>
        
           
            <Grid container item xs ={12} sm ={7}>
                <Grid container item xs ={12} >
                <Message postId={params.id}/>
       
                <Message postId={params.id}/>
            
               <Message postId={params.id}/>
                </Grid>
                <Grid container  item xs ={12}>
                 </Grid>
                 <Grid container item xs ={12}>
                 {/* <TextField label='Email' 
                 
                 placeholder='Enter Email'
                 fullWidth required
                 name = "Email"
                // value= {email}
                // onChange={handleEmail}
                 /> */}
                 <TextareaAutosize
                rowsMin={5}
                placeholder="write your message..."
                className={classes.textarea}
                name='description'
                // value={body}
                // onChange={(e) => setBody(e.target.value)} 
            />
                 </Grid>
                 <Grid container item xs ={12}>
                 <Button 
                // onClick={() => postDetails()}
                  variant="contained" color="primary">Send</Button>
                 </Grid>
            


            {/*  */}
            </Grid>
            <Grid container item xs ={12} sm ={1}>

            </Grid>

  
        
        
        </>
        
      



       
    )
}
// 
export default Messenger