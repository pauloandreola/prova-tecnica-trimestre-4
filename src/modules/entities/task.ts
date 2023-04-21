export class Task {
  _id!: string
  userId: string
  title: string
  description: string
  done: boolean

  constructor (userId: string, title: string, description: string, done: boolean) {
    this.userId = userId
    this.title = title
    this.description = description
    this.done = done
  }
}
