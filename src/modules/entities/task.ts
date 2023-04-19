import { Schema, model } from 'mongoose'
import { ITask } from '../../dtos/ITaskDTO'

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  effort: { type: Number },
  userId: { type: String, ref: 'User', required: true }
},
{ timestamps: true }
)

export const taskModel = model<ITask>('Task', taskSchema)
