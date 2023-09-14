"use client"

import CommitData from '@/components/CommitData'
import fetchBranch from '@/utils/fetchBranch'
import getAllCommits from '@/utils/getAllCommitsOfABranch'
import { Button, Heading } from '@chakra-ui/react'

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './branchname.module.css'
import { useQuery } from '@tanstack/react-query'

export default function BranchPage() {
    
     const [myUrl,setMyUrl]=useState('')
     const [commitFilesData,setCommitFilesdata]=useState()

   
    const showAllCommits= (url)=>{
        console.log("hahahahahahahah")
        setMyUrl(url)

    }
    useEffect(()=>{
        console.log(myUrl,'myurl k939857987348')
    },[myUrl])
    const params=useParams()
 
   
    
//    import point in react query for each and evry query key should be unique unique
    const branchQuery=useQuery({
        queryKey:["branchdetails",params.branchname],
        queryFn:()=>fetchBranch(params.branchname),
       
       
    })
    const commitQuery=useQuery({
        queryKey:["branchDetailsAndCommits",myUrl],
        queryFn: ()=> getAllCommits(myUrl),
        enabled:(branchQuery?.data!==null && myUrl!==null)

    })
  
   useEffect(()=>{
   
     setCommitFilesdata(commitQuery?.data)
     console.log(commitQuery?.data,'commit files data')

   },[commitQuery,myUrl])


 
    if(branchQuery.isLoading){
        return <Heading>Branch names are Loading.....</Heading>
    }
    if(commitQuery.isLoading){
        return <Heading>We are also loadings commit history please wait...</Heading>
    }
    if(branchQuery.isError){
        return <Heading>Ooops... brach names are not found</Heading>
    }
    if(commitQuery.isError){
        return <Heading>Commit history not found ERROR</Heading>
    }
    if(commitQuery.isFetching){
        return <Heading>We are fetching data from server by commit query </Heading>
    }
  return (
    <div className={styles.full_page}>
        <h1 className={styles.branch_title}>Each branch details here of project name {params.branchname}</h1>
        <div className={styles.grid_container}>

       
        <div className={styles.branches_div}>
        {branchQuery?.data?.map((itr,index)=>{
            return (
            <div key={index} >
                <Heading className={styles.branch_name}>{itr.name}</Heading>
                <Button onClick={()=>showAllCommits(itr.commit.url)}className={styles.commit_button}>Show All Commits</Button>
               
                </div>
               
            )
        })}
        </div>
        <div>
        <CommitData commitFilesData={commitFilesData}/>

        </div>
        </div>
        
        
        

        

    </div>
  )
}
