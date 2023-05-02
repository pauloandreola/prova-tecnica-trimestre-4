export class Task {
  _id!: string
  userId: string
  title: string
  description: string
  done: boolean
  createdAt?: Date
  updateAt?: Date

  constructor (userId: string, title: string, description: string, done: boolean, createdAt: Date, updateAt: Date) {
    this.userId = userId
    this.title = title
    this.description = description
    this.done = done
    this.createdAt = createdAt
    this.updateAt = updateAt
  }
}
