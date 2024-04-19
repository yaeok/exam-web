'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import CsvImportForm from '@/components/post_view/csv_import_form'
import CsvTable from '@/components/post_view/csv_output_table'
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Spacer,
  VStack,
} from '@/design'
import { Question } from '@/domain/entity/question_entity'

export default function PostView() {
  const router = useRouter()
  const [lstQuestionState, setlstQuestionState] = useState<Question[]>([])
  const roadCsv = (value: Question[]) => {
    setlstQuestionState(value)
  }

  return (
    <VStack width='100%' paddingY='12px' spacing='8'>
      <HStack width='100%' justifyContent='space-between'>
        <Button onClick={router.back}>戻る</Button>
        <Spacer />
      </HStack>
      <VStack width='100%' spacing='5'>
        <FormControl>
          <FormLabel htmlFor='title'>タイトル</FormLabel>
          <Input id='title' />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='description'>説明</FormLabel>
          <Input id='description' />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='file'>ファイル</FormLabel>
          <CsvImportForm roadCsv={roadCsv} />
        </FormControl>
        <CsvTable lstQuestionInfo={lstQuestionState} />
      </VStack>
    </VStack>
  )
}
