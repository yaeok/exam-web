import { Exam } from '@/domain/entity/exam_entity'

export interface ExamRepository {
  getExamById(args: { eid: string }): Promise<Exam | null>
  getAllExams(args: { uid: string }): Promise<Exam[]>
  createExam(args: { exam: Exam }): Promise<Exam>
  updateExam(args: { exam: Exam }): Promise<Exam>
  deleteExam(args: { eid: string }): Promise<boolean>
}
