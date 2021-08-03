import { useState, useEffect} from 'react';

import { useParams } from 'react-router';

import Person from './Follow';


const Followers = ({ postId }) => {
    const [people, setPeople] = useState([])
    const { id } = useParams()



useEffect(() => {
      const getUser = async () => {
            try {
                const url = `/user/${id}`
                const response = await fetch(url)
                const result = await response.json()

                setPeople(result.posts.following)

            } catch (error) {

                console.log("my error is " + error);
            }
        }

        getUser()

    }, [])


    return (

        <>
            {
                people?.map((option) => (

                    <Person postId={option} />
                ))
            }

        </>



    )

}

export default Followers;