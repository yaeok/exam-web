import { Question } from '../entity/question_entity'

export interface QuestionRepository {
  getQuestionByQid(args: { qid: string; eid: string }): Promise<Question | null>
  regQuestion(args: { eid: string; question: Question }): Promise<Question>
  updQuestion(args: { eid: string; question: Question }): Promise<Question>
}
