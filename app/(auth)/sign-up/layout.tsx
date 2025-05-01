import React from 'react'
import { auth } from '@/server/auth'
import { redirect } from 'next/navigation'


const layout = async ({children}: React.PropsWithChildren<{}>) => {
    const session = await auth()    
    if (session) {
        redirect('/dashboard')
    }
  return (
    <div>
      {children}
    </div>
  )
}

export default layout