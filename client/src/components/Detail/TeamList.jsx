import { useState, useEffect, useContext } from 'react';
import { Box, makeStyles, Typography, Grid, Button } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom'
import { getPost, deletePost, updatePost } from '../../service/api';
import { useParams } from 'react-router';

//components
// import Comments from './comments/Comments';

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
        objectFit: 'cover'
    },
    icons: {
        float: 'right'
    },
    icon: {
        margin: 5,
        padding: 5,
        border: '1px solid #878787',
        borderRadius: 10
    },
    heading: {
        fontSize: 38,
        fontWeight: 600,
        textAlign: 'center',
        margin: '50px 0 10px 0'
    },
    author: {
        color: '#878787',
        display: 'flex',
        margin: '20px 0',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
}));


const TeamList = ({ post }) => {

 

  const classes = useStyle()


    const getUser = (id) => {
        // const url = `/user/${id}`
        fetch(`/user/${id}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result.posts.name)
           
            setName(result.posts.name)
        //     console.log(result.posts.name)
        })




        // try {
        //     const url = `/user/${id}`
        //     const response = await fetch(url)
        //     const result = await response.json()

        //     // setPost(result.posts);
        //     setName(result.posts.name)
        //     // setName(result.posts.po);
        //     console.log(result.posts.name)
        //     // console.log(result.posts.Mentors)
            

            
          
            
        // } catch (error) {
           
        //     console.log("my error is "+ error);
        // }
    }

    const SelectTeam = (postId,mentorId)=>{
        fetch('/selectMentor',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                mentorId
            })
        }).then(res=>res.json())
        .then(result=>{
                   console.log(result.selectedMentor)
          setSelected(result.selectedMentor)
        }).catch(err=>{
            console.log(err)
        })
  }



   const [name,setName] =  useState(null)
   const [selected,setSelected] = useState(undefined)
   const selectedFirst = post.selectedTeamMate
//     useEffect(() => {
//         const fetchData = async () => {
//            await getUser(mentorID);
            
//         }
//        fetchData()
//         // console.log(account, post.username);
        
//     }, []);
//    const url = `/profile/${mentorID}`
    // console.log(post)
    const team = post.TeamMembers
    const handle =(()=>{
        // console.log(var)
        console.log()
        console.log(mentor)
    })
    
    return (

        <Box className={classes.container}>
            
          
             <Button
             onClick={handle}
             >Button</Button>
             {
                 mentor.map(option=>{
                     getUser(option)
                    return (<>
                          <Typography inline><Link to ={`/profile/${option}`}>{name}</Link>   </Typography>
                          <Button
                       onClick={()=>{SelectMentor(post._id,option)}}
                     >Button</Button>
                           </>
                        
                    )
                 })
             }
             {selected?(<>

                {
                 selected.map(option=>{
                     getUser(option)
                    return (<>
                          <Typography inline><Link to ={`/profile/${option}`}>{name}</Link>   </Typography>
                          
                           </>
                        
                    )
                 })
             }
             
             
             </>):(<>
                {
                 selectedFirst.map(option=>{
                     getUser(option)
                    return (<>
                          <Typography inline><Link to ={`/profile/${option}`}>{name}</Link>   </Typography>
                          
                           </>
                        
                    )
                 })
             }
             
                
             
             </>)

             }
       
        </Box>
        
        
        
    )

}

export default TeamList;