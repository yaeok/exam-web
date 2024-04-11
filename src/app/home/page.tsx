'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

import Loading from '@/components/common/loading'
import ExamCard from '@/components/home_view/exam_card'
import { Button, Grid, HStack, Spacer, VStack } from '@/design'
import { Exam } from '@/domain/entity/exam_entity'
import { auth } from '@/infrastructure/firestore/config'
import { IExamRepository } from '@/infrastructure/repository/exam_repository'
import { GetAllExamUseCase } from '@/use_case/exam/get_all_exam_use_case'

export default function HomeView() {
  const router = useRouter()
  const [lstExamState, setLstExamState] = React.useState<Exam[]>([])
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  React.useEffect(() => {
    const fetchExams = async () => {
      const examRepository = new IExamRepository()
      const exams = await new GetAllExamUseCase(examRepository).execute({
        userId: auth.currentUser?.uid ?? '',
      })
      setLstExamState(exams.exams)
      setIsLoading(false)
    }
    fetchExams()
  }, [])
  return isLoading ? (
    <Loading />
  ) : (
    <VStack width='100%' paddingY='8px'>
      <HStack width='100%' justifyContent='space-between'>
        <Spacer />
        <Button onClick={() => router.push('/home/post')}>新規登録</Button>
      </HStack>
      <Grid templateColumns='repeat(3, 1fr)' gap='8px'>
        {lstExamState.map((exam) => (
          <ExamCard
            key={exam.eid}
            eid={exam.eid}
            title={exam.title}
            description={exam.description}
          />
        ))}
      </Grid>
    </VStack>
  )
}
