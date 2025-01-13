import React from 'react'
import { OnboardingForm } from '@/components/Forms/Onboarding'
const page = () => {
  return (
    <div className=' mt-28 flex flex-col justify-center items-center'>
        <h1 className='text-center text-2xl'>Thanks for signing up, we have a few questions for you!</h1>
        <OnboardingForm />

    </div>
  )
}

export default page