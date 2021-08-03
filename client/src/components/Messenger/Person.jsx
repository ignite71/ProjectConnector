import { useState, useEffect, useContext } from 'react';
import { makeStyles,  Grid} from '@material-ui/core';

import { Link } from 'react-router-dom'



const useStyle = makeStyles(theme => ({
 
    image: {
       
        height: '10vh',
        objectFit: 'fill',
        marginTop:"1vh"
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    detail:{
        width: '100px'
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
        
        // console.log(result.posts)
    
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
         <Grid container >
                <Grid item>
                    <Link to ={`/profile/${people._id}`} className={classes.link}>
                    {people.name}</Link>
                </Grid>
                <Grid item>
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