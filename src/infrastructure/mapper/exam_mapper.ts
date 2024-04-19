import { Exam } from '@/domain/entity/exam_entity'

import { ExamDTO } from '../dto/exam/exam_dto'

export class ExamMapper {
  static toDomain(exam: ExamDTO): Exam {
    return new Exam({
      eid: exam.eid,
      title: exam.title,
      description: exam.description,
      sharedIdList: exam.sharedIdList,
      ownerId: exam.ownerId,
      createdAt: exam.createdAt,
      updatedAt: exam.updatedAt,
      deletedAt: exam.deletedAt,
    })
  }
}
