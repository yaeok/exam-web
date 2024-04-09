'use client'
import React from 'react'

import CsvImport from '@/components/widgets/csv_import.component'
import { Button, HStack, Spacer, VStack } from '@/design'
import router from 'next/router'
import { useRouter } from 'next/navigation'

export default function PostView() {
  const router = useRouter()
  return (
    <VStack paddingY='12px'>
      <HStack width='100%' justifyContent='space-between'>
        <Button onClick={router.back}>戻る</Button>
        <Spacer />
      </HStack>
      <CsvImport />
    </VStack>
  )
}
