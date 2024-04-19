import { IExamRepository } from '@/infrastructure/repository/exam_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface DelExamUseCaseInput extends UseCaseInput {
  eid: string
}

interface DelExamUseCaseOutput extends UseCaseOutput {
  result: boolean
}

export class DelExamUseCase
  implements UseCase<DelExamUseCaseInput, Promise<DelExamUseCaseOutput>>
{
  constructor(examRepository: IExamRepository) {
    this.examRepository = examRepository
  }

  private examRepository: IExamRepository

  async execute(input: DelExamUseCaseInput): Promise<DelExamUseCaseOutput> {
    const result = await this.examRepository.delExam({ eid: input.eid })
    return { result }
  }
}
