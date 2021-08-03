import React from 'react'
import { IconButton, Grid, Paper, Avatar, Button, Typography, makeStyles } from '@material-ui/core'
import { useEffect, useState, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { UserContext } from '../../App';

const useStyles = makeStyles((theme) => ({

    avatar: {
        width: theme.spacing(30),
        height: theme.spacing(15),
        margin: theme.spacing(1),
        objectFit: 'scale-down'
    },
    textgrid: {

        [theme.breakpoints.up('md')]: {
            marginTop: "3rem"
        },


    },
    title: {
        color: "tomato",
        marginLeft: "1rem"


    },
    subtitle: {
        color: "tan",
        marginBottom: "3rem",
        marginLeft: "1rem",
        width: "100%",
        maxWidth: "100%",
        overflowWrap: 'break-word'
    }

}))



const Profile = () => {
    const history = useHistory()

    const followers = () => {
        history.push(`/followers/${state?._id}`)
    }
    const following = () => {
        history.push(`/following/${state?._id}`)
    }


    const classes = useStyles()


    const [userProfile, setProfile] = useState(null)

    const { state, dispatch } = useContext(UserContext)
    const { id } = useParams()
    const [showfollow, setShowFollow] = useState(state?.following.includes(id) ? false : true)

    useEffect(() => {
        fetch(`/user/${id}`,
            //    {
            //        headers:{
            //            "Authorization":"Bearer "+localStorage.getItem("jwt")
            //        }
            //    }
        ).then(res => res.json())
            .then(result => {
                console.log(result.posts)

                setProfile(result.posts)
            })
    }, [])

    const followUser = () => {
        fetch('/follow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                followId: id
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)

                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState) => {
                    return {
                        ...prevState,

                        followers: [...prevState.followers, data._id]

                    }
                })
                setShowFollow(false)
            })
    }
    const unfollowUser = () => {
        fetch('/unfollow', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                unfollowId: id
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)

                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))

                setProfile((prevState) => {
                    const newFollower = prevState.followers.filter(item => item != data._id)
                    return {
                        ...prevState,

                        followers: newFollower

                    }
                })
                setShowFollow(true)

            })
    }





    return (
        <>

            <Grid
                container
                spacing={3}
                xs={12}>
                <Grid item sm={1} xs={12}>

                </Grid>
                <Grid container item sm={5} xs={12}>
                    <Grid container justify="center" spacing={3}>
                        <Avatar
                            src={userProfile ? userProfile.pic : "loading"}
                            style={{ margin: 60 }} className={classes.avatar} />
                    </Grid>

                </Grid>
                <Grid container item sm={5} xs={12}>
                    <Grid container justify="center" alignItems="center" direction="column"
                        className={classes.textgrid}
                    // 
                    >
                        <Grid item>
                            {/* <Typography inline>CPU</Typography> */}
                        </Grid>
                        <Grid container item >
                            <Grid item xs={6}>
                                <IconButton className={classes.button} aria-label="Add" size="medium" inline
                                    onClick={followers}
                                >

                                    Followers {userProfile?.followers.length}
                                </IconButton>
                            </Grid>
                            <Grid item xs={6}>

                                <IconButton className={classes.button} aria-label="Add" size="medium" inline
                                    onClick={following}>
                                    Following {userProfile?.following.length}</IconButton>
                            </Grid>

                        </Grid>
                        <Grid container item>

                            <Grid item xs={6}>
                                <Typography variant="h4" style={{ marginLeft: "0.5em" }}>
                                    {userProfile?.name.toUpperCase()}


                                </Typography>

                            </Grid>
                            <Grid item xs={6}>


                            </Grid>


                        </Grid>
                        <Grid container item >
                            <Grid item xs={6}>
                                <Typography variant="h5" className={classes.subtitle}>
                                    {userProfile?.branch.toUpperCase()

                                    }
                                </Typography>
                                {/* <Typography variant="h5" className={classes.subtitle}>
                       {userProfile?.email
                     
                        }
                          </Typography>
                          <Typography variant="h5" className={classes.subtitle}>
                       {userProfile?.college
                     
                        }
                          </Typography> */}







                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h5" className={classes.subtitle}>
                                    {userProfile?.email.toUpperCase()

                                    }
                                </Typography>

                            </Grid>

                        </Grid>
                        <Grid container item >
                            <Grid item xs={6}>
                                <Typography variant="h5" className={classes.subtitle}>
                                    {userProfile?.college.toUpperCase()

                                    }
                                </Typography>








                            </Grid>
                            <Grid item xs={6}>
                                {
                                    state ? (<>
                                        {
                                            !state.following.includes(id) ? (<>
                                                <Button
                                                    onClick={() => followUser()}
                                                    variant="contained" color="primary">Follow</Button>
                                            </>) : (<>
                                                <Button
                                                    onClick={() => unfollowUser()}
                                                    variant="contained" color="primary">UnFollow</Button>

                                            </>)
                                        }


                                    </>) : (<>
                                        <Button

                                            variant="contained" color="error">Follow</Button>

                                    </>)
                                }


                            </Grid>

                        </Grid>

                    </Grid>

                </Grid>
                <Grid item xs={12} sm={1}>

                </Grid>
            </Grid>



        </>
    )
}
// 
export default Profile