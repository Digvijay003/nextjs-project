"use client"
import { Button, Input } from '@chakra-ui/react'
import {  useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from '../app/SignUp/SignUp.module.css'


export default function SignUpForm() {
    const [errors,setErrors]=useState('')
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [error,setError]=useState('')
    const router=useRouter()
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:""
    })
    useEffect(()=>{
        setError('')
        setErrors('')
    },[])
   

    const handleSubmit =async (e)=>{
        e.preventDefault()
        console.log(formData,'formData')
        if(formData.password!==formData.confirmPassword){
            setError("password did not match")
            return
        }
        if(formData.name.length>20){
            setError("name should be less than 20 charcters")
            return

        }
        const isValidEmail=emailRegex.test(formData.email)
        if(!isValidEmail){
            setError("email is not valid")
            return
        }
        try{
            
            const res= await fetch('http://localhost:3000/api/signup',{
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({formData})
            })
            if(res.ok){
                router.push('/home')
               
            }
            else if(res.status === 500){
                setErrors('Email already taken choose another email')
            }
           
           

        }catch(error){
            
            setError("Some Error Occurs")
          
        }
       
        setFormData({
            name:'',
            email:'',
            password:'',
            confirmPassword:""

        })
       

    }
  return (
    <div className={styles.sign_up_form}>
        <form onSubmit={handleSubmit}className={styles.form}>
            <label htmlFor='name'>Full Name</label>
            <Input placeholder='Enter your Full name'id='name'required type='text'onChange={e=>setFormData({...formData,"name":e.target.value})}value={formData.name}/>
            <label htmlFor='email'>Email</label>
            <Input placeholder='Enter your Email Address'id='email'type='email'required onChange={e=>setFormData({...formData,"email":e.target.value})}value={formData.email}/>
            <label htmlFor='password'>Password<span><i className='font-light text-sm'>(Password should be greater than 6 characters)</i></span></label>
            <Input placeholder='Enter your Password'id='password'type='password'onChange={e=>setFormData({...formData,"password":e.target.value})}value={formData.password}/>
            <label htmlFor='confirmPassword'>Confirm Password</label>
            <Input placeholder='Enter your Password again'id='confirmPassword'type='password'onChange={e=>setFormData({...formData,"confirmPassword":e.target.value})}value={formData.confirmPassword}/>
            <div className={styles.button}>
            <Button type='submit'className={styles.submit_button}>Submit</Button>

            </div>
            

        </form>
        <div>
        {error ?<h1 className='text-red-500 text-lg text-center mt-5'>{error}</h1>:''}
       

        </div>
        {errors?<h1 className='text-red-500 text-lg text-center mt-5'>{errors}</h1>:''}
        
       

    </div>
  )
}
