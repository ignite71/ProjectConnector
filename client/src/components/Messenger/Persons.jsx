import { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom'
import { UserContext } from '../../App';
import Person from './Person';


const Persons = ({ postId }) => {
    const { state, dispatch } = useContext(UserContext)
    const history = useHistory()
    const [people, setPeople] = useState([])
    const getgroup = async (id) => {
        try {
            const url = `/condetails/${id}`
            const response = await fetch(url)
            const result = await response.json()
            console.log(result.members)
            setPeople(result.members)
            if (!result.members.includes(state._id)) {
                history.push('/')
            }

        } catch (error) {

            console.log("my error is " + error);
        }
    }


    useEffect(() => {

        getgroup(postId)
    }, [])














    const handle = () => {

    }




    return (

        <>
            {
                people.map((option) => (

                    <Person postId={option} />
                ))
            }

        </>
    )

}

export default Persons;