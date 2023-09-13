"use client";

import React,{useEffect, useState} from 'react'


import LoginButton from "../../components/LoginButton";
import {  useSession } from "next-auth/react";
import UserProfile from "../../components/UserProfile";
import AllRepo from "../../components/AllRepo";
import {  Grid, GridItem, LightMode, Spinner } from '@chakra-ui/react'


import getRepos from '@/utils/getData';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { sendEmailToDb } from '@/utils/sendEmailToDb';



export default function Header2() {
  
  const[accessToken,setAccesToken]=useState('')
  
  const { data: session, status } = useSession();

  const githubtoken=session?.accessToken


 

  if(status==='authenticated'){
    console.log(typeof session.user.email,'session user email from home page')
  
     const callIt=async ()=>{
      await sendEmailToDb(session.user.email)

    }
    callIt()
 
  }

 
 
  

  useEffect(()=>{

    if(typeof localStorage!==undefined){
      setAccesToken(localStorage.getItem('mygithubtoken'))
     }
    

  },[])
  const getReposQuery=useQuery({
    queryKey:["allreposdetails",githubtoken],
    queryFn:()=>getRepos(githubtoken),
    
  })

  if(status==='authenticated'){

  
    if(getReposQuery.isLoading && getReposQuery.isFetching){
      return (
        <div className='spinner_style'>
          <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xxl'
        
      />
    
          </div>)
  
    }
    if(getReposQuery.isError){
      return <h1>Errors Occurs in query fetching</h1>
  
    }
    return (
   
      
      <Grid className='grid-allrepos'>
    
      <GridItem >
       
        <UserProfile name={session.user.name}/>

      
     
      </GridItem>
      <GridItem >

      <AllRepo repos={getReposQuery.data}/>

      </GridItem>
  
    </Grid>
   
    )

  }

else if(status==='unauthenticated'){
  return (
    <LightMode>
    <div className={'flex flex-col items-center justify-center h-screen w-screen -mt-16 login_whole_page'}>
      
      
      <LoginButton />
     
    </div>
    </LightMode>
  )
}
}
