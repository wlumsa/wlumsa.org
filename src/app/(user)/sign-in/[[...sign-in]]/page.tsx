import React from 'react'
import { SignIn } from '@clerk/nextjs'
const page = () => {
  return (
    <div className='mt-28 flex justify-center items-center'>
        <SignIn appearance={{
              elements: {
                formButtonPrimary: ' btn btn-primary text-white',
              }}}
        />
    </div>
  )
}

export default page