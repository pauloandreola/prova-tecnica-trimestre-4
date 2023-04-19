import { Schema } from 'mongoose'
import { ITask } from '../dtos/ITaskDTO'

export const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  effort: { type: Number },
  userId: { type: String, ref: 'User', required: true }
},
{ timestamps: true }
)
