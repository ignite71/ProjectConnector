import { useState, useEffect} from 'react';
import { makeStyles, Grid } from '@material-ui/core';

import { Link} from 'react-router-dom'


const useStyle = makeStyles(theme => ({

    link: {
        textDecoration: 'none',
 
    }
}));


const AuthorView = ({mentorID}) => {
 
    const classes = useStyle()
 const getUser = (id) => {

        fetch(`/user/${id}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result.posts.name)
           
            setUser(result.posts)
       
        })
    }

    const [user,setUser] =  useState([])
  

    useEffect(() => {
        const fetchData = async () => {
           await getUser(mentorID);
            
        }
       fetchData()
   
        
    }, []);


    return (
        <>

    
                <Grid item xs ={6} >
           <Link to ={`/profile/${mentorID}`}
            fullWidth className={classes.link}
           
             >{user.name?.toUpperCase()}</Link>

            </Grid>

            
            
           </>
           

        
    )

}

export default AuthorView;