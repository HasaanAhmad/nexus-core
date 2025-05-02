import React from 'react'
import { getLandingPage } from '@/actions/OrganizationActions'
import { redirect } from 'next/navigation'
import { auth } from '@/server/auth'
import { getOnboardingState } from '@/actions/UserActions'
const page = async () => {
  const session = await auth()
  const onboarding = await getOnboardingState()
  if (!session?.user?.id) {
    return redirect('/sign-in')
  }

  if (!onboarding?.onboardingCompleted) {
    return redirect('/onboarding')
  }



  const result = await getLandingPage()
  const slug = result?.data?.slug


  if (slug) {
    return redirect(`/${slug}/dashboard`)
  }

  return (
    <div>Redirecting to Dashboard</div>
  )
}

export default page 