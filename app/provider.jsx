"use client";


import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import theme from "@/theme";

export const NextAuthProvider = ({ children }) => {
  return (<SessionProvider>
   <ChakraProvider theme={theme}>
   {children}
   </ChakraProvider>
    </SessionProvider>)
};
