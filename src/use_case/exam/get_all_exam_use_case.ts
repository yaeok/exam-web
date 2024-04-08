import { Exam } from '@/domain/entity/exam_entity'
import { IExamRepository } from '@/infrastructure/repository/exam_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface GetAllExamUseCaseInput extends UseCaseInput {
  userId: string
}

interface GetAllExamUseCaseOutput extends UseCaseOutput {
  exams: Exam[]
}

export class GetAllExamUseCase
  implements UseCase<GetAllExamUseCaseInput, Promise<GetAllExamUseCaseOutput>>
{
  constructor(examRepository: IExamRepository) {
    this.examRepository = examRepository
  }

  private examRepository: IExamRepository

  async execute(
    input: GetAllExamUseCaseInput
  ): Promise<GetAllExamUseCaseOutput> {
    const exams = await this.examRepository.getAllExams({ uid: input.userId })
    return { exams }
  }
}
