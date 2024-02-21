import NextAuth from "next-auth";

import Google from "next-auth/providers/google";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} =  NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization:{
        params:{
          scope:"openid https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.install"
        }
      }
    }),
  ],
  callbacks: {
    jwt: ({token, account })=> {
      if (account?.access_token) {
        token.id = account.id
        token.image = account.avatar_url || account.picture
        token.access_token = account.access_token;
      }
      
      
      return token
    },
    session: ({ session, token }) => {
      if (session?.user && token?.access_token) {
        session.sessionToken = String(token.access_token)
      }
      return session
    },
    authorized({ auth }) {
      return !!auth?.user // this ensures there is a logged in user for -every- request
    }
  },
  pages: {
    signIn: '/sign-in' // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
  }
})