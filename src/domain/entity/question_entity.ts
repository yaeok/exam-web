export class Question {
  /** 問題Id */
  qid: string
  /** 問題文 */
  question: string
  /** 選択肢 */
  lstSelect: string[]
  /** 正答 */
  answer: number
  /** 作成日 */
  createdAt: Date
  /** 更新日 */
  updatedAt: Date
  /** 削除日 */
  deletedAt: Date | null
  constructor(args: {
    qid: string
    question: string
    lstSelect: string[]
    answer: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  }) {
    this.qid = args.qid
    this.question = args.question
    this.lstSelect = args.lstSelect
    this.answer = args.answer
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
    this.deletedAt = args.deletedAt
  }
}
