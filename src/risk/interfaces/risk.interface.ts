import { Document } from 'mongoose';

export interface Risk extends Document {
  label: string;
  vitale: boolean;
}
