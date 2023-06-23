"use client"



import { signIn, signOut, useSession } from 'next-auth/react'
import LoginPage from './LoginPage'
import { useState } from 'react'



export default function Header() {
  const{data:session,status}=useSession()
  const [email,setEmail]=useState('')
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!email) return false

    signIn('email', { email, redirect: true })
}
  
 
  if(status==='authenticated'){
    
    return <>
    <h1>Welcome user </h1>
    
    
    <h3>{session.user.name}</h3><br/>
    <button onClick={()=>signOut()}>Log Out</button>
    </>
  }
  else if((status==="loading"|| status==='unauthenticated')){
   
    return (
        <div>
          
         
         {/* HOME PAGE
         <ul>
           <li>
             <Link href='/About'>About Page</Link>
             <Link href='/ContactUs'>ContactUs Page</Link>
           </li>
         </ul>
         <ClientComponent somevalue={somevalue}/> */}
         <LoginPage/>
         <form onSubmit={handleSubmit}>
				<label htmlFor='email'>Email Address</label>
				<input
					value={email}
					type='email'
                    id='email'
					onChange={(e) => setEmail(e.target.value)}
				/>

				<button type='submit' w='100%' my={5}>
					Login
				</button>
			</form>
         
        </div>
       )

  }
    

 
  // const somevalue='this is from server component'

}
