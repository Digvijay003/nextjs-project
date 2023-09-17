"use client";

import {  useSession, signOut } from "next-auth/react";
import Image from "next/image";




export default function ProfileIcon() {
 
  const imgUrl='https://images.pexels.com/photos/4905078/pexels-photo-4905078.jpeg'
  const { data: session, status } = useSession();

  const handleSignOut=(e)=>{
    e.preventDefault()
    localStorage.removeItem('mygithubtoken')

    signOut()
    
  }



  if (status === "authenticated") {
    console.log(session,'github user')
    return (
      <div className="flex gap-5">
        <Image
          src={(session.user.image)?(session.user.image):imgUrl}
          width={50}
          height={30}
          alt='image not found'

          className='user_image'
        />
        <button onClick={(e)=>handleSignOut(e)}className='signOut'>Sign Out</button>
      </div>
    );
  }


 
}
