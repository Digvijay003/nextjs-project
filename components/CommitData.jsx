import { Heading, Progress } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import styles from '../app/pages/repos/[id]/[branchname]/branchname.module.css'

export default function CommitData({commitFilesData}) {
   
  return (
    <div className={styles.commitData}>
        {commitFilesData?.files?.map((itr,index)=>{
            return(<div className='mt-5'key={index+1}>
            <div key={index}className={styles.file_name}>
                {itr.filename}

            </div>
            <div>{itr.status}</div>
            <Progress value={100} size='xs' colorScheme='light-blue' className='mt-5 '/>
            
          
            </div>)
        })}

<Heading size='md'> If you want to see HTML page of commits Click Below</Heading><br/>
            
      

        {commitFilesData?.html_url!==undefined?<Link href={commitFilesData?.html_url}className={styles.html_link}>Check link of html</Link>:'Link is not available yet'}

       

    </div>
  )
}
