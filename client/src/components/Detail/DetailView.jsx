import { useState, useEffect, useContext } from 'react';
import { Box, makeStyles, Typography, Grid, Button } from '@material-ui/core';
import { Delete, Edit } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom'

import { useParams } from 'react-router';

import { UserContext } from '../../App';

import MentorView from './Mentor';
import DiscussionButton from './Discussionbut';
import AddPeople from './Addpeople';


const useStyle = makeStyles(theme => ({
    
    image: {
        width: '100%',
        height: '50vh',
        objectFit: 'fill'
    },
    icons: {
        float: 'right'
    },
    icon: {
        margin: 5,
        padding: 5,
        border: '1px solid black',
        borderRadius: 10
    },
    heading: {
        fontSize: 38,
        fontWeight: 600,
        textAlign: 'center',
        margin: '50px 0 10px 0',
        color:'#878787'
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
    },
    linkappl: {
        textDecoration: 'none',
        color: 'inherit',
        backgroundColor: '#878787'
    },
    detail:{
        width: '100px'
    }
}));


const DetailView = ({ match }) => {


    const {state,dispatch} = useContext(UserContext)
    let finalAuhtor = []
    let finalmentor =[]

            
        
    // }
    const getPost = async (id) => {
        try {
            const url = `/post/${id}`
            const response = await fetch(url)
            const result = await response.json()

            setPost(result.posts);
            setMentor(result.posts.selectedMentor)
            setName(result.posts.postedBy);
            setAuthors(result.posts.selectedTeamMate)
            setConid(result.posts.conid)
  
            

            
          
            
        } catch (error) {
           
            console.log("my error is "+ error);
        }
    }


    const [mentorN,setMentorN] = useState("")
    const getUser = async (id) => {
        try {
            const url = `/user/${id}`
            const response = await fetch(url)
            const result = await response.json()
            setMentorN(result.posts.name)
            console.log(result.posts.name)
   
        } catch (error) {
           
            console.log("my error is "+ error);
        }
    }




    const [conid,setConid] = useState([])
    const [mentor,setMentor] = useState([])
    const [authors,setAuthors] = useState([])

    const [name,setName] =  useState([])

    const params = useParams()
    const classes = useStyle();
   
    const history = useHistory();
    
    const [post, setPost] = useState({});

    
    useEffect(() => {
        const fetchData = async () => {
           await getPost(params.id);
            
        }
       fetchData()
        // console.log(account, post.username);
        
    }, []);
   
    const applicatonurl =`/application/${params.id}`
    const deleteBlog = async () => {    
        await deletePost(post._id);
        history.push('/')
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
           
        })
    }






    return (

        <Box className={classes.container}>
            <img src={post.photo} alt="post" className={classes.image} />
            <Box className={classes.icons}>
                {   

                    state?._id===post?.postedBy?._id?
                    (<> 
                      <Link to={`/update/${params.id}`}><Edit className={classes.icon} color="primary"/></Link>
                       
                       <Link><Delete onClick={() => deleteBlog()} className={classes.icon} color="error" /></Link>
                    </>):(<></>)
                }
            </Box>
          
             <Grid container direction="column">
                 <Grid item xs={12} alignContent="center" > 
                 <Typography className={classes.heading}>{post.title}</Typography>
            

                 </Grid>
                 <Grid container item xs={12}>
                     <Grid item xs={6}
                      
                      >
                     <Link to={`/profile/${name._id}`} className={classes.link}>
                     <Typography>Author: <span style={{fontWeight: 600}}>
                        { 
                          name.name
                        }
                        </span></Typography>
                     </Link>
                


                     </Grid>
                     <Grid item xs ={3} sm={5}></Grid>
                      <Grid item xs={3} sm={1}> <Typography 
                      alignContent="right"
                     >{new Date(post.createdAt).toDateString()}</Typography></Grid>

                     
                 </Grid>
                 
                 <br/>


                 <Grid container item xs ={12}>
                     <Grid item xs ={12}>
                 
                     <Typography 
                     color = 'inherit'
                     align='justify'
                     variant='body2'
      
                     style={{ wordWrap: "break-word" }
                    
                    }
        
                  >{post.body}</Typography>
                   
                         
                      </Grid>
                 
                 </Grid>
                 
                 <Grid item xs ={12}>
                     {state? (<>
                     {(state._id === name._id)?(<>
                     <Link to = {applicatonurl} className={classes.linkappl} >
                         Applications
                     </Link>
                      </>):(<>
               
                      </>)

                     }
                      </>):(<></>)


                     }
                     
                 
                 </Grid>
                 <Grid container item xs={12}>
                     {(conid.length==0)?(<>
                       {post?.postedBy?._id===state?._id &&
                       <DiscussionButton post ={post}/>
                    //    )
                    //    :(<></>)
                       }
                     </>):
                     (<>
                     
                   {   
                       (post.selectedMentor.length>=1||post.selectedTeamMate.length>=1)&&(state._id===post?.postedBy._id)&&
                        <AddPeople post ={post}/>
                   }
                     </>)

                     }
                     
                     
                    
                </Grid>
            
                <Grid container item xs={12}>
                 {
                     post?(<>
                     {
                         post.conid?(<>
                         {(post.selectedMentor.includes(state._id)||post.selectedTeamMate.includes(state._id) ||post.postedBy._id===state._id)  &&
                              <Link to ={`/messenger/${post?.conid[0]}`}>Chat room</Link>
                         }
                         {
                            !( (post.selectedMentor.includes(state._id)||post.selectedTeamMate.includes(state._id) ||post.postedBy._id===state._id))&&
                            <Button color='error' variant="outlined" disabled>Chat on application acceptance</Button>

                         }
                          
                         

                             
                         
                         
                         </>):(<></>)
                     }
                     
                     </>):(<></>)
                 }
               
                </Grid>

             </Grid>


                   
                   <Grid container xs={12}>
                   {
                     console.log( finalmentor = [...new Set(mentor)])
                  }
                   
                    <Typography>Mentor: <span style={{fontWeight: 600}}>
                        { 
                       finalmentor.map((mentorID)=>{
                    //  
                       console.log(mentorID)
                        return(
                            <>
                            {
                               <MentorView mentorID={mentorID} />
   

                            }
                            </>
                        )
                       })
                        }
                        </span></Typography>
                        
                        </Grid>

              <br/>
                  <Grid container xs={12}>
               
                  {
                     console.log( finalAuhtor = [...new Set(authors)])
                  }
                  
                    <Typography>TeamMembers: <span style={{fontWeight: 600}}>
                         { finalAuhtor?.map((authorID)=>{
                            //  
                               console.log(authorID)
                                return(
                                    <>
                                    {
                                       <MentorView mentorID={authorID} />
        
                                    }
                                    </>
                                )
                               })}
                               </span></Typography>
                              
                               </Grid>

        </Box>
        
        
        
    )

}

export default DetailView;