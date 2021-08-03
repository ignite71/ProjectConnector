import { useState, useEffect} from 'react';
import {  Button } from '@material-ui/core';

import M from 'materialize-css'

const AddPeople = ({ post }) => {
    
   const [people,setPeople] = useState([])
    const getgroup = async (id) => {
        try {
            const url = `/Userrepresent/${id}`
            const response = await fetch(url)
            const result = await response.json()
            console.log(result.members)
            setPeople(result.members)

           

            
          
            
        } catch (error) {
           
            console.log("my error is "+ error);
        }
    }
// 
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
                   M.toast({html: "Added",classes:"#c62828 red darken-3"})

        }).catch(err=>{
            console.log(err)
        })
  }


    useEffect(()=>{
        mentors = [...new Set(mentors)];
        team = [...new Set(team)];
   if(people.length>=1){
       mentors.map((option)=>{
           if(!people.includes(option)){
            SetMembers(convid,option)
           }
       })
       team.map((option)=>{
        if(!people.includes(option)||!mentors.includes(option)){
         SetMembers(convid,option)
        }
    })
   }
    },[people])
    






  const ID = post._id
  const convid = post.conid[0]
let mentors = post?.selectedMentor
let team = post?.selectedTeamMate

 



    return (

        <>
       
      
            <Button
  
        variant="contained" color="action"
        onClick={()=>{getgroup(post._id)}}
    
        >Add New selected Members

        </Button>
      

     



        </>
        
        
        
    )

}

export default AddPeople;