import React from 'react'
import StepperHeader from './_components/StepperHeader'
import Onboarding from './_components/Onboarding'
import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'
import { getOnboardingState } from '@/actions/UserActions'
const page = async() => {
  const session = await auth()
  const onboardingState = await getOnboardingState()
if(onboardingState?.onboardingCompleted){
    redirect('/dashboard')
  
    return
  }

  if(!session?.user){
    redirect('/sign-in')
  }
  
  return (
    <div>
      <StepperHeader/>
      <Onboarding/>
    </div>
  )
}

export default page