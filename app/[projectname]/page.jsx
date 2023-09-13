"use client"
import fetchBranch from '@/utils/fetchBranch'
import getAllCommits from '@/utils/getAllCommitsOfABranch'
import getTreeStructure from '@/utils/getTreeStructure'
import { Button, Heading, Progress, Spinner, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './projectName.module.css'
import { useQuery } from '@tanstack/react-query'

export default function page() {
    const params=useParams()
  
    const [treeQueryData,setTreeQueryData]=useState()
    const [myurl,setUrl]=useState('')
    const [treeUrl,setTreeUrl]=useState('')

    const firstQuery=useQuery({
      queryKey:["project-details-queries",params.projectname],
      queryFn:()=>fetchBranch(params.projectname)
    })

    const showTreeStructure=(url)=>{
      setUrl(url)
    }
    const commitQuery=useQuery({
      queryKey:["commits",myurl],
      queryFn:()=>getAllCommits(myurl),
      enabled:(firstQuery?.data!==null)
    })
    useEffect(()=>{
   
      if(commitQuery?.data?.commit?.tree?.url!==''){
        setTreeUrl(commitQuery?.data?.commit?.tree?.url)

      }
      
    },[commitQuery])

    const treeQuery=useQuery({
      queryKey:["treequery",treeUrl],
      queryFn:()=>getTreeStructure(treeUrl),
      enabled:commitQuery?.data?.commit?.tree?.url!==null
    })

    useEffect(()=>{
      
      setTreeQueryData(treeQuery?.data?.tree)
      
    },[treeQuery])

    if(firstQuery.isLoading){
      return (<div>
        <Heading>Loading branches Name ....</Heading>
        <div className='spinner_style'>
          <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xxl'
        
      />
    
          </div>
       
        
      </div>)
    }

    if(treeQuery.isLoading){
      return (<div>
        <Heading>Tree Data is Loading...</Heading>
        <div className='spinner_style'>
          <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xxl'
        
      />
    
          </div>
       
      </div>)
    }

    if(commitQuery.isLoading){
      return (<div>
         <Heading>
        Wait a little bit data is loading regarding all commits
      </Heading>
      <div className='spinner_style'>
          <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xxl'
        
      />
    
          </div>

      </div>)
     
    }

   
   

  
   
  return (
    <div className={styles.full_page}>
        <Heading className={styles.project_title}>Let see details of proejct : {params.projectname}</Heading>
        <Heading className={styles.project_structure}>Let see project structure of each branch</Heading>
        <div className={styles.grid_container}>
          <div className={styles.all_repo_buttons}>
        {firstQuery?.data?.map((itr,index)=>{
          return (<div key={index}className={styles.single_repo_div}>
          
          <Button className={styles.repo_buttons}onClick={()=>showTreeStructure(itr.commit.url)}>{itr.name}</Button>
          </div>)
        })}
        </div>
        <div className={styles.treeData}>
        {treeQueryData?.map((itr,index)=>{
          return(
            <div key={index}className={styles.single_repo_div_details}>
            <Heading className={styles.repo_details_title}type='blue'size='md'>{itr.path}</Heading>
            {itr.mode==='040000'?<Text size='xs'>It is a folder</Text>:<Link className={styles.repo_details_link}href={{pathname:`/htmlpages/${index}`,query:{name:itr.url}}}>{itr.url}</Link>}
            <Progress value={100} size='xs' colorScheme='light-blue' className='mt-5 '/>
            </div>
          )
        })}
        </div>
        </div>
    </div>
  )
}
