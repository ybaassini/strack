import { Document } from 'mongoose';
import { Photo } from 'common/interfaces/photo.interface';

export interface User extends Document{
  lastName: string;
  firstName: string;
  email: string;
  role: string;
  password: string;
  auth: {
    email : {
      valid : boolean,
    }
  },
  settings: {
  }
}