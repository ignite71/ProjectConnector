import { useState, useEffect} from 'react';
import { Box, makeStyles, Typography, Grid, Button } from '@material-ui/core';

import { useHistory } from 'react-router-dom'

import { useParams } from 'react-router';
import AuthorView from './MentorList';


const useStyle = makeStyles(theme => ({

    image: {
        width: '100%',
        height: '50vh',
        objectFit: 'cover'
    },
   
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    detail:{
        width: '100px'
    }
}));


const ApplicationView = ({ match }) => {

    const [selected,setSelected] = useState(undefined)
    const [selectedteam,setSelectedteam] = useState(undefined)
    const [sFirst,setFirst] =  useState([])
    const [sFirstteam,setFirstteam] =  useState([])


    const getPost = async (id) => {
        try {
            const url = `/post/${id}`
            const response = await fetch(url)
            const result = await response.json()

            setPost(result.posts);
            setMentor(result.posts.Mentors)
            setTeam(result.posts.TeamMembers)
            setFirst(result.posts.selectedMentor)
            setFirstteam(result.posts.selectedTeamMate)
      
            
            

            
          
            
        } catch (error) {
           
            console.log("my error is "+ error);
        }
    }


   


    const [mentor,setMentor] = useState([])
    const [team,setTeam] = useState([])

    const params = useParams()
    const classes = useStyle();

    
    const [post, setPost] = useState({});



        const SelectMentor = (postId,mentorId)=>{
            if(sFirst?.includes(mentorId))
            return
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
          setSelectedteam(result.selectedTeamMate)

        }).catch(err=>{
            console.log(err)
        })
  }
  const SelectTeam = (postId,teamId)=>{
    if(sFirstteam?.includes(teamId))
    return
    fetch('/selectTeam',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId,
            teamId
        })
    }).then(res=>res.json())
    .then(result=>{
            //    console.log(result.selectedTeamMate)
 
      setSelectedteam(result.selectedTeamMate)

    }).catch(err=>{
        // console.log(err)
    })
}
    
    useEffect(() => {
        const fetchData = async () => {
           await getPost(params.id);
            
        }
       fetchData()
  
        
    }, []);

 
 
    const ID = post._id
    return (

        <>
        <Box className={classes.container}>
            <Grid container xs ={12} justifyContent="center">
                <Typography color='primary' variant='h1'>{post.title?.toUpperCase()}</Typography>
                
                <Grid container  >
                <Typography color='secondary' variant='h3'>Select Mentor</Typography>
                { 
                       mentor.map((mentorID)=>{
                    //  
                       
                        return(
                            <>
                            {<>
                            <Grid container item xs ={12}>
                               <AuthorView mentorID={mentorID} />
                               <Grid item xs ={6}>
                                  <Button 
                                   onClick={()=>{SelectMentor(post._id,mentorID)}}
                                   variant="outlined" color="secondary"
                                  >
                                      Accept
                                  </Button>
                                  </Grid>
                                  </Grid>
                            </>
                            }
                            </>
                        )
                       })
                        }
                        <Typography color='secondary' variant='h3'>Select Team</Typography>
                        { 
                       team.map((mentorID)=>{
                    //  
                    
                        return(
                            <>
                            {<>
                            <Grid container item xs ={12}>
                               <AuthorView mentorID={mentorID} />
                               <Grid item xs ={6}>
                                  <Button 
                                   onClick={()=>{SelectTeam(post._id,mentorID)}}
                                   variant="outlined" color="secondary"
                                  >
                                      Accept
                                  </Button>
                                  </Grid>
                                  </Grid>
                            </>
                            }
                            </>
                        )
                       })
                        }
                         
                        </Grid>

            </Grid>
            <Grid container >
                <Grid item  xs ={12}>
                <Typography color='textPrimary' variant='h3'>Selected Mentor</Typography>
                    {selected?(<>
                    {
                        selected.map((mentorID)=>(
                            <>
                            
                            <AuthorView mentorID={mentorID} />
                            </>
                        ))
                    }
                    
                    </>):(<>
                      {sFirst.map((mentorID)=>(
                           
                           <>
                            
                            <AuthorView mentorID={mentorID} />
                            </>
                           
                        ))}
                    
                    </>)

                       
                    }
                    <Typography color='textPrimary' variant='h3'>Selected Team</Typography>
                    {selectedteam?(<>
                    {
                        selectedteam.map((mentorID)=>(
                            <>
                            
                            <AuthorView mentorID={mentorID} />
                            </>
                        ))
                    }
                    
                    </>):(<>
                      {sFirstteam.map((mentorID)=>(
                           
                           <>
                            
                            <AuthorView mentorID={mentorID} />
                            </>
                           
                        ))}
                    
                    </>)

                       
                    }
                   
                </Grid>

            </Grid>
        </Box>
        </>
     
        
        
    )

}

export default ApplicationView;