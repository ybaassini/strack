import { Document } from "mongoose";

import * as mongoose from 'mongoose';

export interface Krt extends Document {
  local: string;
  poste: mongoose.Types.ObjectId;
  s1: string;
  s2: string;
  conforme: boolean;
  affichageINR: string;
  inhibition: boolean;
}
