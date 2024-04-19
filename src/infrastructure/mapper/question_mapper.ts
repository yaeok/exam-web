import { Question } from '@/domain/entity/question_entity'
import { QuestionDTO } from '@/infrastructure/dto/question/question_dto'

export class QuestionMapper {
  static toDomain(question: QuestionDTO): Question {
    return new Question({
      qid: question.qid,
      question: question.question,
      answer: question.answer,
      lstSelect: question.lstSelect,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
      deletedAt: question.deletedAt,
    })
  }
}
