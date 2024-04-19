import { Exam } from '@/domain/entity/exam_entity'

export interface ExamRepository {
  getExamByEid(args: { eid: string }): Promise<Exam | null>
  getAllExams(args: { uid: string }): Promise<Exam[]>
  regExam(args: { exam: Exam }): Promise<Exam>
  updExam(args: { exam: Exam }): Promise<Exam>
  delExam(args: { eid: string }): Promise<boolean>
}
