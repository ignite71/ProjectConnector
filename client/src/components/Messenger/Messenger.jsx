
import React, { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { TextareaAutosize, Box, Grid, Button, makeStyles } from '@material-ui/core'
import Persons from './Persons';
import { io } from 'socket.io-client'
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import Message from './Message/Message';
const useStyle = makeStyles(theme => ({

    textarea: {
        width: '100%',
        border: 'none',
        marginTop: 50,
        fontSize: 18,
        '&:focus-visible': {
            outline: 'none'
        }
    },
    chatbox: {
        height: "40vh",
        overflowY: "scroll",
        width: "90%"
    }

}));






const Messenger = () => {
    const params = useParams()
    const ENDPOINT = 'localhost:3000'
    const classes = useStyle()
    const { state, dispatch } = useContext(UserContext)
    const [currentChat, setCurrentChat] = useState(null)
    const [newMessage, setNewMessage] = useState("")
    const scrollRef = useRef();
    const socket = useRef()
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [conversation, setConversatons] = useState(undefined)
    const [conversationMembers, setConversationMembers] = useState([])
    useEffect(() => {
        const getconversation = async () => {
            try {
                const url = `/group/${state._id}`
                const response = await fetch(url)
                const result = await response.json()

                setConversatons(result[0]._id)
                setConversationMembers(result[0].members)

                console.log(result[0]._id)



            } catch (err) {
                console.log(err)
            }
        }
        getconversation()
    }, [state._id])

    useEffect(() => {
        if (conversation) {

            const getChat = async () => {
                try {
                    const url = `/allmessage/${params.id}`
                    const response = await fetch(url)
                    const result = await response.json()

                    console.log(result)
                    setCurrentChat(result)

                } catch (err) {
                    console.log(err)
                }
            }
            getChat()

        }

    }, [conversation])
    const [toggle, setToggle] = useState(0)

    useEffect(() => {
        socket.current = io(ENDPOINT)
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.sender,
                message: data.message,
                conversationId: data.conversationId,
                createdAt: Date.now(),
            });
        });
    }, [])

    useEffect(() => {

        socket.current.emit("addUser", {
            name: state._id,
            room: params.id,

        });
        console.log(params.id)

    }, [state]);

    useEffect(() => {
        arrivalMessage &&
            (params?.id === arrivalMessage.conversationId) &&
            setCurrentChat((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, conversationMembers]);



    const handle = (() => {
        // console.log(state._id)
        console.log(conversation)
    })
    const [url, setUrl] = useState(null)

    useEffect(() => {
        if (url) {

            socket.current.emit("sendMessage", {
                sender: state._id,
                conversationId: params.id,
                message: newMessage,
            });



            fetch(`/message/${params.id}`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({

                    message: newMessage
                })
            }).then(res => res.json())
                .then(data => {

                    console.log(data)
                    setCurrentChat([...currentChat, data])
                    setNewMessage("")
                }).catch(err => {
                    console.log(err)
                })
        }
    }, [toggle])


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [currentChat]);




    return (
        <>
            <Grid container>

                <Grid container item xs={12} sm={4}>
                    <Persons postId={params.id} />
                </Grid>
                <Grid container item xs={12} sm={7}>
                    <Box className={classes.chatbox}>
                        <Grid container item xs={12} >
                            {
                                currentChat ? (<>
                                    {
                                        currentChat.map((chat) => (
                                            <Grid container ref={scrollRef}>

                                                <Message chat={chat} />
                                            </Grid>


                                        ))
                                    }

                                </>) : (<></>)
                            }


                        </Grid>
                    </Box>


                    <Grid container item xs={12}>
                    </Grid>
                    <Grid container item xs={12}>
                        <TextareaAutosize
                            rowsMin={5}
                            placeholder="write your message..."
                            className={classes.textarea}
                            name='description'
                            value={newMessage}
                            onChange={(e) => {
                                console.log(newMessage)
                                setNewMessage(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid container item xs={12}>
                        <Button
                            onClick={() => {
                                setUrl(conversation)
                                setToggle(toggle + 1)
                            }}
                            variant="contained" color="primary"

                        >Send</Button>
                    </Grid>



                    {/*  */}
                </Grid>
                <Grid container item xs={12} sm={1}>


                </Grid>

            </Grid>
            <Grid container xs={12}>
                <Button
                    onClick={() => (
                        handle()
                    )}
                >
                    check
                </Button>
            </Grid>



        </>

    )
}
// 
export default Messenger