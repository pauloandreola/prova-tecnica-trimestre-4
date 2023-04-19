import { Document } from 'mongoose'

export interface ITask extends Document {
  _id: string;
  title: string;
  description: string;
  effort: number;
  userId: string;
}
