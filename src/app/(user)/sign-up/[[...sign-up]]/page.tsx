import React from 'react'
import { SignUp } from '@clerk/nextjs'
const page = () => {
  return (
    <div className='flex  flex-col justify-center items-center m-12' >
        <SignUp/>
    </div>
  )
}

export default page