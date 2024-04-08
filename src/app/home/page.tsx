'use client'
import React from 'react'

import ExamCard from '@/components/widgets/exam_card.component'
import Loading from '@/components/widgets/loading.component'
import { Exam } from '@/domain/entity/exam_entity'
import { auth } from '@/infrastructure/firestore/config'
import { IExamRepository } from '@/infrastructure/repository/exam_repository'
import { GetAllExamUseCase } from '@/use_case/exam/get_all_exam_use_case'
import { VStack } from '@chakra-ui/react'

export default function HomeView() {
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
    <VStack paddingY='8px'>
      {lstExamState.map((exam) => (
        <div key={exam.eid}>
          <ExamCard
            eid={exam.eid}
            title={exam.title}
            description={exam.description}
          />
        </div>
      ))}
    </VStack>
  )
}
