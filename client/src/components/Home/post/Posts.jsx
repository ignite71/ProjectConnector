import React, { useState, useEffect, useContext } from 'react'
import { Button, Grid, Box, Typography, makeStyles } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { UserContext } from '../../../App'



const useStyle = makeStyles({
    container: {
        border: '1px solid #d3cede',
        borderRadius: 10,
        margin: 10,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',

        height: 400,
        '& > *': {
            padding: '0 5px 5px 5px'
        }
    },
    image: {
        width: '100%',
        objectFit: 'contain',
        borderRadius: '10px 10px 0 0',
        height: 150
    },
    textColor: {
        color: '#878787',
        fontSize: 12
    },
    heading: {
        fontSize: 18,
        fontWeight: 600,
        textAlign: 'center'


    },
    detail: {
        fontSize: 14,
        wordBreak: 'break-word'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }

})

const Posts = () => {
    const { search } = useLocation();
    const [data, setData] = useState([])
    const { state, dispatch } = useContext(UserContext)
    useEffect(() => {
        fetch(`/allpost${search}`).then(res => res.json())
            .then(result => {
                console.log(result)
                setData(result.posts)
            })
    }, [search])
    const newhandle = () => {
        console.log(state)
    }

    // 
    const classes = useStyle();

    const likePost = (id) => {
        fetch('/like', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                //   console.log(result)
                const newData = data.map(item => {
                    if (item?._id == result?._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const unlikePost = (id) => {
        fetch('/unlike', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: id
            })
        }).then(res => res.json())
            .then(result => {
                //   console.log(result)
                const newData = data.map(item => {
                    if (item?._id == result?._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const ApplyMentor = (postId) => {
        fetch('/mentor', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId
            })
        }).then(res => res.json())
            .then(result => {
                //   console.log(result)
                const newData = data.map(item => {
                    if (item?._id == result?._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }

    const ApplyTeam = (postId) => {
        fetch('/applyteam', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId
            })
        }).then(res => res.json())
            .then(result => {
                //   console.log(result)
                const newData = data.map(item => {
                    if (item?._id == result?._id) {
                        return result
                    } else {
                        return item
                    }
                })
                setData(newData)
            }).catch(err => {
                console.log(err)
            })
    }




    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    }


    return (
        <>
            {
                data.length ? data.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>

                        {
                            <Box className={classes.container}>
                                <Grid container justify="center" alignItems="center" >
                                    <Grid item xs={12}>
                                        <img src={post.photo} alt="post" className={classes.image} />
                                    </Grid>

                                    <Grid item xs={12}>

                                        <Typography className={classes.textColor}>{post.category}</Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography className={classes.heading}>{addEllipsis(post.title, 20)}</Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography className={classes.textColor}>Author: {post.postedBy.name}</Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Typography className={classes.detail}>{addEllipsis(post.body, 10)}</Typography>
                                    </Grid>
                                    {
                                        state&&state?._id!==post.postedBy._id ? (<>
                                            <Grid item xs={12}>






                                                {
                                                    post?.Mentors.includes(state?._id) ? (<>
                                                        <Button type='submit' color='error' variant="contained" className={classes.btnstyle} fullWidth

                                                        >Applied</Button>


                                                    </>) : (<>
                                                        <Button type='submit' color='primary' variant="contained" className={classes.btnstyle} fullWidth
                                                            onClick={() => ApplyMentor(post?._id)}
                                                        >Apply for mentorship</Button>
                                                    </>)
                                                }

                                            </Grid>

                                            <Grid item xs={12}>
                                                {
                                                    post?.TeamMembers.includes(state?._id) ? (<>
                                                        <Button type='submit' color='error' variant="contained" className={classes.btnstyle} fullWidth

                                                        >Applied</Button>

                                                    </>) : (<>
                                                        <Button type='submit' color='primary' variant="contained" className={classes.btnstyle} fullWidth
                                                            onClick={() => ApplyTeam(post?._id)}
                                                        >Apply for Team</Button>

                                                    </>)
                                                }


                                            </Grid>






                                        </>) : (<>

                                            <Grid item xs={12}>
                                                <Button type='submit' color='error' variant="contained" className={classes.btnstyle} fullWidth
                                                    disabled
                                                >Apply for mentorship</Button>
                                                <Button type='submit' color='error' variant="contained" className={classes.btnstyle} fullWidth
                                                    disabled
                                                >Apply for Team</Button>
                                            </Grid>

                                        </>)
                                    }


                                    <Grid item xs={12}>
                                        {state ? (
                                            <>

                                                {post.likes.includes(state?._id) ?
                                                    (
                                                        <>

                                                            <Typography className={classes.detail}
                                                                onClick={() => { unlikePost(post?._id) }}
                                                            ><FavoriteIcon
                                                                    color="disabled"

                                                                    fontSize="large" /> {post.likes.length}</Typography>


                                                        </>

                                                    ) :
                                                    (
                                                        <>

                                                            <Typography className={classes.detail}
                                                                onClick={() => { likePost(post?._id) }}
                                                            ><FavoriteBorderIcon
                                                                    color="action"

                                                                    fontSize="large" /> {post.likes.length}</Typography>

                                                        </>
                                                    )

                                                }


                                            </>
                                        ) :
                                            (
                                                <>
                                                    <Typography className={classes.detail}

                                                    ><FavoriteBorderIcon
                                                            color="action"

                                                            fontSize="large" /> {post.likes.length}</Typography>

                                                </>

                                            )}


                                        <Link to={`/details/${post?._id}`} className={classes.link}>Details</Link>

                                    </Grid>


                                </Grid>




                            </Box>


                        }

                    </Grid>

                ))
                    : (
                        <Box style={{ color: '878787', margin: '30px 80px', fontSize: 18 }}>
                            No data is available for selected category
                        </Box>
                    )}
        </>
    )



}
// 
export default Posts;