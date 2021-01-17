import { ConstatDto, StatusConstatEnum } from "./constat.dto";

export class CreatePosteDto {
  readonly date: Date;
  readonly status: StatusConstatEnum = StatusConstatEnum.inProgress;
  readonly label: string;
  readonly email: string;
  readonly projet: string;
  readonly zone: string;
  readonly constats: ConstatDto[];
}