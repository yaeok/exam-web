'use client'
import { useRouter } from 'next/navigation';
import React from 'react';

import CsvImport from '@/components/post_view/csv_import';
import { Button, HStack, Spacer, VStack } from '@/design';

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
