export class Question {
  /** 問題Id */
  qid: string
  /** 問題文 */
  question: string
  /** 選択肢 */
  lstSelect: Select[]
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
    lstSelect: Select[]
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

export class Select {
  value: number
  label: string

  constructor(args: { value: number; label: string }) {
    this.value = args.value
    this.label = args.label
  }
}
