
import { NextAuthProvider } from './NextAuthProvider'
import './globals.css'
import { Inter } from 'next/font/google'



const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'sample project',
  description: '',
}

export default function RootLayout({ children }) {
  
  return (
  
  <html lang="en">
    <body className={inter.className}>
    <NextAuthProvider>
      {children}
      </NextAuthProvider>
     
      
      </body>
  </html>

  

  )
}
