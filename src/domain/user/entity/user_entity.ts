export class User {
  uid: string
  username: string
  email: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  constructor(args: {
    uid: string
    username: string
    email: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  }) {
    this.uid = args.uid
    this.username = args.username
    this.email = args.email
    this.createdAt = args.createdAt
    this.updatedAt = args.updatedAt
    this.deletedAt = args.deletedAt
  }
}
