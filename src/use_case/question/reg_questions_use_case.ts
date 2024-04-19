import { Question } from '@/domain/entity/question_entity'
import { IQuestionRepository } from '@/infrastructure/repository/question_repository'
import { UseCase, UseCaseInput } from '@/use_case/use_case'

interface RegQuestionsUseCaseInput extends UseCaseInput {
  eid: string
  questions: Question[]
}

export class RegQuestionsUseCase
  implements UseCase<RegQuestionsUseCaseInput, Promise<void>>
{
  constructor(questionRepository: IQuestionRepository) {
    this.questionRepository = questionRepository
  }

  private questionRepository: IQuestionRepository

  async execute(input: RegQuestionsUseCaseInput): Promise<void> {
    for (const question of input.questions) {
      await this.questionRepository.regQuestion({
        question: question,
        eid: input.eid,
      })
    }
  }
}
