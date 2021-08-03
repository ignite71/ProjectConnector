import { useState, useEffect } from 'react';
import { makeStyles, Grid } from '@material-ui/core';

import { Link } from 'react-router-dom'


const useStyle = makeStyles(theme => ({

    link: {
        textDecoration: 'none',
        color: '#878787'
    }
}));


const MentorView = ({ mentorID }) => {

    const classes = useStyle();

    const getUser = async (id) => {
        try {
            const url = `/user/${id}`
            const response = await fetch(url)
            const result = await response.json()
           setName(result.posts.name)

            // console.log(result.posts.name)
        } catch (error) {

            console.log("my error is " + error);
        }
    }



    const [name, setName] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            await getUser(mentorID);

        }
        fetchData()
        // console.log(account, post.username);

    }, []);
    const url = `/profile/${mentorID}`

    return (

        <Grid item xs={12}>


            <Link to={url} className={classes.link}>{name}</Link>

        </Grid>



    )

}

export default MentorView;