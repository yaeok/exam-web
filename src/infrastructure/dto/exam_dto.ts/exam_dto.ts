import { Exam } from '@/domain/entity/exam_entity'
import { DocumentData } from '@firebase/firestore'

import { DataTransferObject } from '../dto'

export class ExamDTO implements DataTransferObject {
  constructor(args: {
    eid: string
    title: string
    description: string
    sharedIdList: string[]
    ownerId: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  }) {
    this.eid = args.eid
    this.title = args.title
    this.description = args.description
    this.sharedIdList = args.sharedIdList
    this.ownerId = args.ownerId
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
    this.deletedAt = args.deletedAt
  }

  eid: string
  title: string
  description: string
  sharedIdList: string[]
  ownerId: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null

  static fromDoc(doc: DocumentData): ExamDTO {
    return new ExamDTO({
      eid: doc.eid,
      title: doc.title,
      description: doc.description,
      sharedIdList: doc.sharedIdList,
      ownerId: doc.ownerId,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
      deletedAt: doc.deletedAt,
    })
  }

  static fromEntity(entity: Exam): ExamDTO {
    return new ExamDTO({
      eid: entity.eid,
      title: entity.title,
      description: entity.description,
      sharedIdList: entity.sharedIdList,
      ownerId: entity.ownerId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    })
  }

  toData(): { [name: string]: any } {
    return {
      eid: this.eid,
      title: this.title,
      description: this.description,
      sharedIdList: this.sharedIdList,
      ownerId: this.ownerId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    }
  }
}
