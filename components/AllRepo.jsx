import { Box, Button, ButtonGroup, Divider, Flex, FormControl, FormLabel, HStack, Heading, IconButton, Input, Progress, Select, Spacer, useColorMode, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import SingleRepo from './SingleRepo'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import axios from 'axios'

import { redirect, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { GITHUBTOKEN } from '@/utils/githubtoken'



export default function AllRepo({repos}) {
  const router=useRouter()
  const {colorMode}=useColorMode()
  const{data:session}=useSession()

  const githubtoken=GITHUBTOKEN

  const { isOpen, onOpen, onClose } = useDisclosure()
  const inputRef=useRef()
  
  const [input,setInput]=useState('')

  const [filteredRepos,setFilteredRepos]=useState()



  useEffect(()=>{
   
    const result =repos.filter(item=>item.name.toLowerCase().includes(input.toLocaleLowerCase()))
    setFilteredRepos(result)

  },[input])
  let timeout2
  
  const createRepository =async ()=>{
    clearTimeout(timeout2)
    const repo_name=inputRef.current.value
   
      const response =await axios.post('https://api.github.com/user/repos',
      
        {  
        "name":repo_name
      }
    ,
      {
        headers:{
          'Content-Type': 'application/json',
          Authorization:`Bearer ${githubtoken}`
        }
      }).then(response=> {
        timeout2=setTimeout(()=>{
          alert('Repo is created successfully ')
        },1000)
      }).catch(err=>router.push(`/errors/${err.response.status}`))
     return response

  }

  const handleRepoSubmit=async (e)=>{
    e.preventDefault()

    await createRepository()
    onClose()
    router.refresh()
   
  }
 
  let timeout
  const handleChange=(query)=>{
    clearTimeout(timeout)

    timeout=setTimeout(()=>{
     console.log(query)
     setInput(query)

    },100)
   

  }


  return (
    <div className={colorMode==='dark'?'repo-page_light':'repo_page'}>
    
   
        <div className='search_navbar'>
        

     <div>   

<Input variant='outline' className='input_text'placeholder='Enter Repository Name'onChange={e=>handleChange(e.target.value)}value={input}/>

</div>  

 
  <div >
  <Button colorScheme='blue'className='repo_button'onClick={onOpen}>New Repo</Button>
   
  </div>
 
 
</div>
<Progress value={100} size='xs' colorScheme='light-blue' className='mt-5'/>



<SingleRepo repos={input?.length!=='0'?filteredRepos:repos}/>
<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          
          <ModalCloseButton />
          <ModalBody>
          <FormControl>
  <FormLabel>Title of Repo</FormLabel>
  <Input ref={inputRef}/>
  </FormControl>
           
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'onClick={handleRepoSubmit}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      


    </div>
  )
}
