import SignUpForm from '@/components/SignUpForm'
import React from 'react'
import styles from './SignUp.module.css'

export default function page() {
  return (
    <div className={styles.signUP}>
        <SignUpForm/>

    </div>
  )
}
