import React from 'react'
import { SignIn } from '@clerk/nextjs'
const page = () => {
  return (
    <div className='mt-28'>
        <SignIn/>
    </div>
  )
}

export default page