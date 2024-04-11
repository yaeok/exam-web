'use client'
import { ReactNode } from 'react'

import { calc, Container } from '@/design'

export default function Main({ children }: { children: ReactNode }) {
  return (
    <Container
      as='main'
      maxW={{ md: 'container.md', sm: 'container.sm' }}
      minH='calc(100vh - 60px)'
    >
      {children}
    </Container>
  )
}
