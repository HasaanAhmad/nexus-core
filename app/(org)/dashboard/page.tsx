import React from 'react'
import { getLandingPage } from '@/actions/OrganizationActions'
import { redirect } from 'next/navigation'
import { auth } from '@/server/auth'

const page = async () => {
    const session = await auth()
    if (!session?.user?.id) {
        return redirect('/sign-in')
    }

    const result = await getLandingPage()
    const slug = result?.data?.slug
    if (!slug) {
        return redirect('/')
    }
    if (slug) {
        redirect(`/${slug}/dashboard`)
    }

  return (  
    <div>Redirecting to Dashboard</div>
  ) 
}

export default page 