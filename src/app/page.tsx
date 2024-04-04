'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import { auth } from '@/infrastructure/firestore/config'

export default function Nav() {
  const router = useRouter()
  const user = auth.currentUser

  React.useEffect(() => {
    if (!user) {
      router.push('/signin')
    } else {
      router.push('/home')
    }
  }, [])

  return null
}
