'use client'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

import Loading from '@/components/widgets/loading.component'
import { auth } from '@/infrastructure/firestore/config'

type Props = {
  children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const user = auth.currentUser
  const router = useRouter()

  if (typeof user === 'undefined') {
    return <Loading />
  }
  if (user === null) {
    router.replace('/signin')
    return null
  }

  return <>{children}</>
}