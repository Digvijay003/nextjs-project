"use client"


import {  Box, Button, Card, CardBody, CardFooter, CardHeader, FormControl, FormLabel, Grid, GridItem, HStack, Heading, Input, SimpleGrid, Spacer, Text,Textarea, useColorMode } from '@chakra-ui/react'
import { redirect, useParams } from 'next/navigation'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

import React, { useEffect, useRef, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import postToGithub from '@/utils/postData'
import BranchDetails from '@/components/BranchDetails'
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import ContentDetails from '@/components/ContentDetails'

import UserProfile from '@/components/UserProfile'
import getRepos from '@/utils/getData'

import { useSession } from 'next-auth/react'



export default function IssueDetails() {

const{data:session,status}=useSession({
  required:true,
  onUnauthenticated(){
    redirect('/')
  }
})

const githubtoken=session?.accessToken

const [mydata,setMydata]=useState()

const { colorMode} = useColorMode()

const params=useParams()


useEffect(()=>{
  async function getReposDetails(){
    const res=await getRepos(githubtoken)
    
    res?.map((itr)=>{
      if(itr.id==params.id){
        setMydata(itr)
        console.log(itr,'ye he data')
      }
    })
  }
  getReposDetails()

},[])

useEffect(()=>{
  console.log(mydata,'mydatalatestwala')

},[mydata])


  const {isOpen,onClose,onOpen}=useDisclosure()
  const inputRef=useRef()
  const body=useRef()
  let timeout
  if(status==='authenticated'){
  const handleSubmit=(e)=>{
    clearTimeout(timeout)
    e.preventDefault()
    
    const repository = mydata?.name; // Replace with your repository information
    const endpoint = 'issues'; // Replace with the specific API endpoint
    const data = { "title": inputRef.current.value ,"body":body.current.value}; // Replace with your actual data
    const token = githubtoken;

    postToGithub(repository,endpoint,data,token).then(response=>{
      timeout = setTimeout(()=>{
        alert("Issue has been Raised")
      },1000)
    }).catch(error=>console.log('failed'+error))
    onClose()
   


  }
   

  return (
    <div className='repo_details_page'>
    
      <HStack spacing={6} className='title-repodetails'>
      <Heading fontSize='30px'> Repo Id is : {mydata?.id}</Heading>
        <Text fontSize='20px'fontWeight='bold'>Repo name is : {mydata?.name}</Text>
        <Button onClick={onOpen}>New Issue</Button>

      </HStack>

        <Grid 
       
      className='grid_repo_details'
       >
          <GridItem className='first-itemof-grid'>
           
          <UserProfile name={session?(session?.user?.name):'Digvijay Singh'}/>
         

          </GridItem>
          <GridItem>
         
            
            <Card className={colorMode==='dark'?'bg-slate-500 text-slate-300 mb-10':'each_card'}>
    <CardHeader>
      <Heading size='md'> Branches Details</Heading>
    </CardHeader>
    <CardBody>
      <Text>View a summary of all your branches by clicking them below </Text>
    </CardBody>
    <Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" textAlign='left'>
          View Here
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
     {mydata!==undefined ?<BranchDetails mydata={mydata}/>:null}
    </AccordionPanel>
  </AccordionItem>

 
</Accordion>

  </Card>
  <Card className={colorMode==='dark'?'bg-slate-500 text-slate-300 mb-10':'each_card'}>
    <CardHeader>
      <Heading size='md'> Contents</Heading>
    </CardHeader>
    <CardBody>
      <Text>View your content sha key</Text>
    </CardBody>
    <Accordion defaultIndex={[0]} allowMultiple>
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span"  textAlign='left'>
          View Here
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
    {mydata!==undefined?<ContentDetails mydata={mydata}/>:null}
    </AccordionPanel>
  </AccordionItem>

  
</Accordion>
  </Card>
 
  </GridItem>
  <GridItem>
 
  <Card className={colorMode==='dark'?'bg-slate-500 text-slate-300 mb-10':'each_card'}>
    <CardHeader>
      <Heading size='md'> SSH URL</Heading>
    </CardHeader>
    <CardBody>
    <Link href={mydata?.ssh_url} isExternal>
  Ssh Url Link <ExternalLinkIcon mx='2px' />
</Link>
    </CardBody>
  
  </Card>
  <Card className={colorMode==='dark'?'bg-slate-500 text-slate-300 mb-10':'each_card'}>
    <CardHeader>
      <Heading size='md'> Description</Heading>
    </CardHeader>
    <CardBody>
      <Text>{mydata?.description}</Text>
    </CardBody>
    <CardFooter>
      <Text>Created At {mydata?.created_at}</Text>
      <Link className='external-link'href={`/${mydata?.name}`} isExternal>See More About This Project<ExternalLinkIcon mx='5px' /></Link>
      
    </CardFooter>
  </Card>
  </GridItem>

</Grid>
    
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <FormControl>
  <FormLabel>title of issue</FormLabel>
  <Input ref={inputRef}/>
  
</FormControl>
<FormControl>
  <FormLabel>Details of issue</FormLabel>
  <Textarea ref={body}></Textarea>
  
</FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'onClick={(e)=>handleSubmit(e)}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        

    </div>
  )
  }
}
