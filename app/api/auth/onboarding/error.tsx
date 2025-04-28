'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Error() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Something went wrong!</h1>
      <Button onClick={() => router.refresh()}>Try again</Button>
    </div>
  )
} 