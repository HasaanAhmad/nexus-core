import { auth } from "@/server/auth"
import { prisma } from "@/server/prisma"
import { redirect } from "next/navigation"

const Layout = async ({
  children,
  params
}: {
  children: React.ReactNode
  params: { slug: string }
}) => {
  const session = await auth()
  const { slug } = await params
  if (!session?.user?.id) {
    redirect('/sign-in')
  }

  // Validate organization slug
  const organization = await prisma.organization.findFirst({
    where: {
      slug: slug,
      users: {
        some: {
          id: session.user.id
        }
      }
    }
  })

  if (!organization) {
    redirect('/')
  }

  return <div suppressHydrationWarning>{children}</div>
}

export default Layout

