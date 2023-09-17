
import { signIn, useSession } from "next-auth/react";

import { useState } from "react";

export default function LoginButton() {
 
  const{data:session,status}=useSession()
   // const [show,setShow]=useState(false)
  // const [loginNotOK,setLoginNotOk]=useState('')
  // const [loginData,setLoginData]=useState({
  //   email:"",
  //   password:""
  // })
  
  const token=session?.accessToken
  const [accessToken,setAccesToken]=useState('')
  const handleSignInGitHub=(e)=>{
    e.preventDefault()
    localStorage.setItem("mygithubtoken",token)
    signIn('github')
    setAccesToken(localStorage.getItem('mygithubtoken'))
 

  }
  // const handleSubmit=async(e)=>{
    
  //   e.preventDefault()
  //   setAccesToken('')
  //   localStorage.removeItem('mygithiubtoken')
  //   try{
     
  //     const {email,password}=loginData
     
  //     console.log(email,password)
  //     signIn('credentials',{email,password,redirect:false})
  //   setTimeout(()=>{
  //     console.log(status,'status')
  //     if(status==='unauthenticated'){
  //       setLoginNotOk("check credentials again !!!!!!!!!!")
  //     }
  //   },[7000])

  //   }
  //   catch(error){
   
     
  //   console.log(error,'let see errors')
  //   }
  
  //   setLoginNotOk('')
   
  // }
 

  // const handleClick=()=>{
  //   setShow(!show)

  // }

 
  return (
    <>
    <div className='login_card' >
      <div>
       
      <h1 className='login_title'>Login To Get Started</h1>
      </div>
      
   <div>
   <button
      onClick={(e)=>handleSignInGitHub(e)}
      className="login_button"
    >
      Sign in with Github
    </button>

   </div>

   {/* If you want login functionality with Database also */}
   {/* <h1 className="mt-3 font-medium text-2xl">OR </h1>
   <form onSubmit={handleSubmit}className="px-4 py-3">
   <label htmlFor="email"className='input_label'>email</label>
   <Input required placeholder="Enter Email" className='input_login'type='email'id='email'name='email'value={loginData.email}onChange={e=>setLoginData({...loginData,"email":e.target.value})}/>
   <label htmlFor="password"className='input_label'>password</label>
   <InputGroup size='md'>
      <Input
        className='input_login'
        type={show ? 'text' : 'password'}
        placeholder='Enter password'
        value={loginData.password}
        onChange={e=>setLoginData({...loginData,"password":e.target.value})}
        name="password"
        id="passsword"
      />
      <InputRightElement width='2.5rem'>
          {show ?  <LockIcon onClick={handleClick}/> : <UnlockIcon onClick={handleClick}/>}
 
      </InputRightElement>
    </InputGroup>
   
   <div className='submit_button-email'>
   <Button type='submit'className='submit_button_footer'>Submit</Button>
   <div className='footer_text'>
    <p >Dont have Account yet?</p>
   <Link href='/SignUp'className='signup_link'>Sign Up here.</Link>

   </div>
   

   </div>
   
   </form>
   <br/>
   {loginNotOK ? <h1 className='login_notRight'>{loginNotOK}</h1>:""} */}

   
    
    </div>
    <div className="circle one">

    </div>
    <div className="circle two">

    </div>
    </>
  );
}
