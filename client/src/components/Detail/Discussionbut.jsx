import { useState, useEffect,  useContext} from 'react';
import {  makeStyles,  Button } from '@material-ui/core';

import {useHistory } from 'react-router-dom'
import { useParams } from 'react-router';

import { UserContext } from '../../App';




const DiscussionButton = ({ post }) => {
    const [people,setPeople] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const {id} = useParams()

    const SetMembers = (postId,mentor)=>{
        fetch('/addUser',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                groupId:postId,
                userId:mentor
            })
        }).then(res=>res.json())
        .then(result=>{
                   console.log(result)

        }).catch(err=>{
            console.log(err)
        })
  }



    const SetConvid = (postId,groupId)=>{
        fetch('/postconversationId',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId,
                conversationId:groupId
            })
        }).then(res=>res.json())
        .then(result=>{
                   
                //    history.push(`/details/${id}`)
                window.location.reload()
   
        }).catch(err=>{
            console.log(err)
        })
  }


    const StartConvo = (postId)=>{
        fetch('/creategroup',{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                post:postId
            })
        }).then(res=>res.json())
        .then(result=>{
                   console.log(result.group._id)
                   setPeople(result.group.members)
          setCond(result.group._id)
        }).catch(err=>{
            console.log(err)
        })
  }





const [cond,setCond] = useState([])



// 
 
    useEffect(()=>{

        mentors = [...new Set(mentors)];
        team = [...new Set(team)];


       if(cond.length>=1){

      
            mentors?.map((option)=>{
                if(!people.includes(option)){
                    SetMembers(cond,option)
                   }
            })
            team?.map((option)=>{
                if(!people.includes(option)||!mentors.includes(option)){
                    SetMembers(cond,option)
                   }
            })

        

        // SetMembers(cond,post.selectedMentor)
        // SetMembers(cond,post.selectedTeamMate)
        SetConvid(post._id,cond)   
       }
    },[cond])
    const newid = post._id
    let mentors = post?.selectedMentor
    let team = post?.selectedTeamMate

    return (

        <>
       
      
            <Button
  
        variant="contained" color="action"
         onClick={()=>{
             StartConvo(post._id)
  
         

            }}
        >Start the Group

        </Button>
      

     



        </>
        
        
        
    )

}

export default DiscussionButton;