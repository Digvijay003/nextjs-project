import { Image,Heading, Text, Button, HStack, Circle, Avatar, Input, useDisclosure, FormControl, FormLabel, useColorMode } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'

import { AtSignIcon, EmailIcon } from '@chakra-ui/icons'
import { useSession } from 'next-auth/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

export default function UserProfile({name}) {
  useEffect(()=>{
    setError("")
  },[])
  const{data:session}=useSession()
  const [error,setError]=useState('')
  const{colorMode}=useColorMode()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editDetails,setEditDetails]=useState({
    email:'default@email',
    address:'default@address'
  })
  const EmailRef=useRef()
  const AddressRef=useRef()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const openModal=()=>{
    setError('')
    onOpen()

  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    const isValidEmail=emailRegex.test(EmailRef.current.value)
    if(!isValidEmail){
        setError("email is not valid")
        return
    }
    if(AddressRef.current.value.length>25){
      setError("address is too long it must be less than 25 charcters")
      return
    }
    
    setEditDetails({["email"]:EmailRef.current.value,["address"]:AddressRef.current.value})
    EmailRef.current.value===''
    AddressRef.current.value===''
    setError("")

    
    onClose()
  }
  return (<>
  <div>
    <div>
   <Image
   className='user_image'
  
  boxSize='150px'
  src='https://images.pexels.com/photos/4905078/pexels-photo-4905078.jpeg'
  alt='User Iamge'
  
/>
<Avatar name='Dan Abrahmov' src={(session.user.image)?(session.user.image):'https://images.pexels.com/photos/4905078/pexels-photo-4905078.jpeg'} size='xs'className='user_avatar'/>
</div>
<div className='extra_user_info'>


<Heading fontSize='30px'fontWeight='bold'>{name?name:'Honey Singh'}</Heading>
<Heading fontSize='15px'>{session.user.email}</Heading>



<Text>Web Developer</Text>
<Button
  size='md'
  height='35px'
  width='90%'
 

  className={colorMode==='dark'?'editprofile-button bg-slate-800':'editprofile-button '}
  onClick={openModal}
>
  Edit profile
</Button>

<div className='user-details'  >
 
 <div className='user-details-items'>
  <HStack>
 <Circle size='20px'  color={colorMode==='dark'?'blue.300':'blue'}>
  <AtSignIcon/>
  </Circle>
 <Text>{editDetails.address}</Text>
 </HStack>
  
 </div>
</div>

<div className='user-details'>

 <div className='user-details-items'>
  <HStack>
 <Circle size='20px'  color={colorMode==='dark'?'blue.300':'blue'}>
  <EmailIcon/>
  </Circle>
 <Text>{editDetails.email}</Text>
 </HStack>

 </div>
</div>

</div>
</div>
<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Your Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          
          </ModalBody>
          <form onSubmit={(e)=>handleSubmit(e)} className='m-5'>

        
        
  <label for='email'className='font-medium'>Email address</label>
  <Input placeholder='Enter Email ' ref={EmailRef}id='email'type='email'required/>
 <label for='address'className='font-medium'>Address</label>
 <Input placeholder='Enter Address' ref={AddressRef}id='address'required/>
 <Button colorScheme='blue'mr={4} type='submit'className='mt-8 w-1/2'>Submit</Button>
            <Button colorScheme='red' onClick={onClose}className='mt-8 ml-20 w-1/4'>
              Close
            </Button>


</form>
{error?<div className='modal-error'>{error}</div>:''}
         

        </ModalContent>
      </Modal>
</>



 
  )
}
