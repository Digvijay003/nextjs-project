"use client"
import { Button, Input, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import styles from './ContactUs.module.css'

export default function ContactUs() {

  const {colorMode}=useColorMode()
  
    const [email,setEmail]=useState('')
    const [error,setError]=useState('')
    const toast=useToast()
    const {data:session,status}=useSession({
      required:true,
      onUnauthenticated(){
        redirect('/')
      }
    })

    let timeout;

    useEffect(()=>{
      document.removeEventListener("click",()=>{
        toast.close()
      })
      clearTimeout(timeout)

    },[])
    
   
 const handleSubmit=async (e)=>{

          e.preventDefault()
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const chechValidmail=emailRegex.test(email)
          if(!chechValidmail){
            setError('email is not validated try again')
            setEmail('')
            return 

          }
          toast({
            title: `We will reach to you on this email Id very soon ${email}`,
            position:"top",
            containerStyle: {
        width: '800px',
        height:"400px",
        maxWidth: '100%',
      },
  
            status: 'success',
            duration: 5000,
            isClosable: true, 
          })

          timeout=setTimeout(()=>{
            document.addEventListener("click",()=>{
              toast.close()

            })

          },[2000])

        await axios.post('http://localhost:3000/api/contact',{
           
            data:{"email":email},
            headers:{
                "Content-type":"application/json"
            },
         
    }).then(res=>console.log(res,'post request response')).catch(err=>console.log(err,'error occurs'))
        setEmail('')
        setError('')

    }

  
  return (
    <div className={styles.contact_form}>
        <h1 className={styles.contact_heading}>Enter your email address we will reach you shortly!!! </h1>
        <form onSubmit={handleSubmit} className={styles.formContact}>
          <div>
            <label htmlFor='email'className={colorMode==='dark'?"text-slate-800":""}>Enter Email Address</label>
            <Input className={colorMode==='dark'?`${styles.input_field_dark}`:`${styles.input_field}`}id='email'type='email'required name='email'value={email}onChange={e=>setEmail(e.target.value)}/>
            </div>
            <Button type='submit'className={styles.submit_button}>Submit</Button>

        </form>
        {error?<h1 color='red'className={styles.error}>{error}</h1>:''}

    </div>
  )
}
