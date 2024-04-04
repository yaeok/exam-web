'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

export default function Nav() {
  const router = useRouter()
  // const user = auth.currentUser

  React.useEffect(() => {
    router.replace('/signin')
  }, [])

  return null
}
