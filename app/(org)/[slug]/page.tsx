import React from 'react'
import { getLandingPage } from '@/actions/OrganizationActions'
import { redirect } from 'next/navigation'
import { getOnboardingState } from '@/actions/UserActions'
import { auth } from '@/server/auth'
const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const result = await getLandingPage()
  const onboardingState = await getOnboardingState()
  console.log('onboardingState', onboardingState);

  const session = await auth()
  if (!session?.user?.id) {
    return redirect('/sign-in')
  }

  if (!onboardingState?.onboardingCompleted) {
    return redirect('/onboarding')
  }

  if (result?.data?.slug !== (await params).slug) {
    redirect(`/`)
  }
  if (result?.data?.slug) {
    redirect(`/${(await params).slug}/dashboard`)
  }






  return (
    <div>

    </div>
  )
}

export default page