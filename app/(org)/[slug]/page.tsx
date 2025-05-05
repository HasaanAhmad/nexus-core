import { getLandingPage } from '@/actions/OrganizationActions'
import { redirect } from 'next/navigation'
import { getOnboardingState } from '@/actions/UserActions'
import { auth } from '@/server/auth'

const Page = async ({ params }: { params: { slug: string } }) => {
  const session = await auth()
  if (!session?.user?.id) {
    return redirect('/sign-in')
  }

  const [result, onboardingState] = await Promise.all([
    getLandingPage(),
    getOnboardingState()
  ])

  // Check onboarding first
  if (!onboardingState?.onboardingCompleted) {
    return redirect('/onboarding')
  }

  // Validate organization slug
  if (!result?.success || !result.data?.slug) {
    return redirect('/')
  }

  // Check if the URL slug matches the user's organization slug
  if (result.data.slug !== params.slug) {
    return redirect('/')
  }

  // If everything is valid, redirect to dashboard
  return redirect(`/${params.slug}/dashboard`)
}

export default Page