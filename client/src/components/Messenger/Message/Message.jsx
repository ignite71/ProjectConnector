
import React, { useState, useEffect, useContext } from 'react';
import { Grid, Typography } from '@material-ui/core'
import { format } from "timeago.js"
import { UserContext } from '../../../App';

const Message = ({ chat }) => {
    const [name, setName] = useState("")
    const [userId, setUserID] = useState("")
    const { state, dispatch } = useContext(UserContext)

    useEffect(() => {


        const getUser = async (id) => {
            try {
                const url = `/user/${chat.sender}`
                const response = await fetch(url)
                const result = await response.json()
                setName(result.posts.name)
                setUserID(result.posts._id)

            } catch (error) {

                console.log("my error is " + error);
            }

        }
        getUser()

    }, [chat])



    return (
        <>{(state._id === userId) ? (<>
            <Grid containe item xs={6} direction="column" >


            </Grid>
            <Grid containe item xs={6} direction="column" >
                <Grid item>
                    <Typography>{name}{format(chat.createdAt)}</Typography>
                </Grid>
                <Grid item>
                    <Typography>{chat.message} </Typography>
                </Grid>

            </Grid>


        </>) : (<>
            <Grid containe item xs={6} direction="column" >
                <Grid item>
                    <Typography>{name}</Typography>
                </Grid>
                <Grid item>
                    <Typography>{chat.message}  </Typography>
                </Grid>

            </Grid>
            <Grid containe item xs={6} direction="column" >

            </Grid>


        </>)

        }

        </>


        //  
    )
}
// 
export default Message