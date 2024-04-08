export class Exam {
  /** 試験Id */
  eid: string
  /** タイトル */
  title: string
  /** 説明 */
  description: string
  /** 共有ユーザーIdリスト */
  sharedIdList: string[]
  /** 所有者Id */
  ownerId: string
  /** 作成日 */
  createdAt: Date
  /** 更新日 */
  updatedAt: Date
  /** 削除日 */
  deletedAt: Date | null
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
}
