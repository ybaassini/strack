import * as mongoose from "mongoose";
export class CreateZoneDto {
  readonly label: string;
  readonly projet: mongoose.Types.ObjectId;
}