"use client"
import Link from "next/link";
import ProfileIcon from "./ProfileIcon";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, IconButton, useColorMode } from "@chakra-ui/react";

import { useSession } from "next-auth/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const {data:session,status}=useSession()
  const { colorMode, toggleColorMode } = useColorMode()
 
  
  return (
    <nav className="navbar">
      <Link className="font-bold mt-1" href={"/"}>
        Abc Company
      </Link>
      {(status==='authenticated') ? <><Breadcrumb fontWeight='medium' fontSize='sm'className='breadCrumb_items'>


  <BreadcrumbItem>
    <BreadcrumbLink href='/home'>All Repos</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem >
    <BreadcrumbLink href='/Contact'>Contact</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
    <div >
    <main >
   <IconButton  aria-label="Toggle Mode" onClick={toggleColorMode}className='icon_button_navbar'>
        { colorMode === 'light' ? <MoonIcon /> : <SunIcon/> }
      </IconButton>
    </main>
  </div>
  </>
:''}
      <ProfileIcon />
    </nav>
  );
}
