"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function LoginPage() {
  
  return (
    <div>
        <h1>Login to proceed</h1>
        <button onClick={()=>signIn('github')}>Sign In</button>
    </div>
  )
}
