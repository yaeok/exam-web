import { Exam } from '@/domain/entity/exam_entity'
import { IExamRepository } from '@/infrastructure/repository/exam_repository'
import { UseCase, UseCaseInput, UseCaseOutput } from '@/use_case/use_case'

interface RegExamUseCaseInput extends UseCaseInput {
  exam: Exam
}

interface RegExamUseCaseOutput extends UseCaseOutput {
  exam: Exam
}

export class RegExamUseCase
  implements UseCase<RegExamUseCaseInput, Promise<RegExamUseCaseOutput>>
{
  constructor(examRepository: IExamRepository) {
    this.examRepository = examRepository
  }

  private examRepository: IExamRepository

  async execute(input: RegExamUseCaseInput): Promise<RegExamUseCaseOutput> {
    const exam = await this.examRepository.regExam({ exam: input.exam })
    return { exam }
  }
}
