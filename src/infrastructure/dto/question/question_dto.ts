import { Question } from '@/domain/entity/question_entity'
import { DataTransferObject } from '@/infrastructure/dto/dto'
import { DocumentData } from '@firebase/firestore'

export class QuestionDTO implements DataTransferObject {
  constructor(args: {
    qid: string
    question: string
    answer: number
    lstSelect: string[]
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  }) {
    this.qid = args.qid
    this.question = args.question
    this.answer = args.answer
    this.lstSelect = args.lstSelect
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
    this.deletedAt = args.deletedAt
  }

  qid: string
  question: string
  answer: number
  lstSelect: string[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  static fromDoc(doc: DocumentData): QuestionDTO {
    return new QuestionDTO({
      qid: doc.qid,
      question: doc.question,
      answer: doc.answer,
      lstSelect: doc.lstSelect,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      deletedAt: doc.deletedAt,
    })
  }

  static fromEntity(entity: Question): QuestionDTO {
    return new QuestionDTO({
      qid: entity.qid,
      question: entity.question,
      answer: entity.answer,
      lstSelect: entity.lstSelect,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    })
  }

  toData(): { [name: string]: any } {
    throw new Error('Method not implemented.')
  }
}
