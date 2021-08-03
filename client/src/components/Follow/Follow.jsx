import { useState, useEffect } from 'react';
import {  makeStyles, Grid} from '@material-ui/core';

import { Link} from 'react-router-dom'


const useStyle = makeStyles(theme => ({
   
    image: {
       
        height: '10vh',
        objectFit: 'fill'
    },
   
   
    link: {
        textDecoration: 'none',
        color: 'inherit',
        fontWeight:'20',
        fontSize:'50'
    },
 
    box:{
        border: '1px solid black'
    }
}));









const Person = ({ postId }) => {

    const classes = useStyle()
   const [people,setPeople] = useState([])
   const getUser = async (id) => {
    try {
        const url = `/user/${id}`
        const response = await fetch(url)
        const result = await response.json()

        setPeople(result.posts)
        
        console.log(result.posts)
    
        

        
      
        
    } catch (error) {
       
        console.log("my error is "+ error);
    }
}

  

 useEffect(()=>{
   
     getUser(postId)
 },[])


    











    const handle =()=>{
       
    }


    return (

        <>
        { people?(<>
         <Grid container item xs ={12} className={classes.box} >
                <Grid item xs ={6}>
                    <Link to ={`/profile/${people._id}`} className={classes.link}>
                    {people?.name?.toUpperCase()}</Link>
                </Grid>
                <Grid item xs ={6}>
                    <img src ={people.pic} className ={classes.image} />
                </Grid>
            </Grid>

        </>):(<>
        </>)
           
        }
      

     



        </>
        
        
        
    )

}

export default Person;