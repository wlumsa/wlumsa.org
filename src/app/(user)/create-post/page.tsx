// 'use client'
// import React from 'react'
// import Listing from '@/components/Forms/Listing'
// import { useUser } from '@clerk/nextjs'
// import { useState, useEffect } from 'react'
// import createClerkSupabaseClient from '@/lib/supabaseClient'
// import { SignInButton } from '@clerk/nextjs'
// const page = () => {

//   const { user } = useUser()
//   const userId= user?.id
//   const [loggedIn, setLoggedIn] = useState(false)
//   const client = createClerkSupabaseClient()

//   useEffect(() => {
//     if (user) {
//       setLoggedIn(true);
//     } else {
//       setLoggedIn(false);
//     }
//   }, [user]);
//   return (
//     <div className='m-24 text-center' >
//       {/* checki if user is logged in - else redirect to login */}
//       {loggedIn ? <Listing/> : 
//       <div>
//        <h1>You must log in or create an account to create a post</h1> 
//        <div className='btn text-primary font-bold' ><SignInButton mode='modal' fallbackRedirectUrl={"/create-post"} /></div>
//         </div>}
//     </div>
//   )
// }

// export default page