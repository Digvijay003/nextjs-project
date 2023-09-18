"use client";

import React,{useEffect, useState} from 'react'


import LoginButton from "../../components/LoginButton";
import {  useSession } from "next-auth/react";
import UserProfile from "../../components/UserProfile";
import AllRepo from "../../components/AllRepo";
import {  LightMode, Spinner } from '@chakra-ui/react'


import getRepos from '@/utils/getData';
import { useQuery } from '@tanstack/react-query';

import { sendEmailToDb } from '@/utils/sendEmailToDb';
import styles from './home.module.css'



export default function Header2() {
  
  const[accessToken,setAccesToken]=useState('')
  
  const { data: session, status } = useSession();

  const githubtoken=session?.accessToken


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
    const callIt=async ()=>{
      await sendEmailToDb(session.user.email)

    }
    callIt()

  
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
   
      
      <div className={styles.grid_allrepos}>
    
      <div>
       
        <UserProfile name={session.user.name}/>

      
     
      </div>
      <div >

      <AllRepo repos={getReposQuery.data}/>

      </div>
  
    </div>
   
    )

  }

else if(status==='unauthenticated'){
  return (
    <LightMode>
    <div className={styles.login_whole_page}>
      
      
      <LoginButton />
     
    </div>
    </LightMode>
  )
}
}
