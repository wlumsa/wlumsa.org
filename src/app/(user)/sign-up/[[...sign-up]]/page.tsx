import React from 'react'
import { SignUp } from '@clerk/nextjs'

const page = () => {
  return (
    <div className='mt-16 flex justify-center items-center'> 
        <SignUp appearance={{
              elements: {
                formButtonPrimary: ' btn btn-primary text-white',
              },
              
            }}
            />
    </div>
  )
}

export default page