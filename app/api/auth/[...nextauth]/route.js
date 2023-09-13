import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/mongoDB/connectDB";
import myModelForLogin from "@/models/SignUpModels";



const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
    
      name:'Credentials',
      credentials:{
        email:{label:"email",type:"email"},
        password:{label:"password",type:'password'}

      },
     
      async authorize(credentials){
        await connectDB()
        const loginuser = await myModelForLogin.findOne({email:credentials.email}).select("+password")
        if(!loginuser){
         
          throw new Error("user not found")
          
        }
       
        const isPasswordCorrect = (credentials.password === loginuser.password)
        if(!isPasswordCorrect){
         
          throw new Error("Invalid Credentials")
        }
        return loginuser

      }
    })
 
   
  ],
  callbacks: {
  
   
    async jwt({ token, account, profile }) {
     
      // Persist the OAuth access_token and or the user id to the token right after signin
     if(account){
        token.accessToken = account?.access_token
        token.id = profile?.id
     }
      return token
    },
    async session({ session, token, user }) {
   
      // Send properties to the client, like an access_token and user id from a provider.
    
        session.accessToken = token?.accessToken
        session.user.id = token?.id

      return session
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }

  }
 
});

export { handler as GET, handler as POST };
