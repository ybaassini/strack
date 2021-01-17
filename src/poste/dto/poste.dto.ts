import { UserDto } from "../../users/dto/user.dto";
import { StatusEnum } from "../../common/enum";
import { ProjetDto } from "../../projet/dto/projet.dto";
import { ZoneDto } from "../../zone/dto/zone.dto";
import { ConstatDto } from "./constat.dto";
import { ApiProperty } from "@nestjs/swagger";

export class PosteDto {
  constructor(object: any) {
    const id = object._id.toHexString();
    this.id = id;
    this.date = object.date;
    this.email = object.email;
    this.status = object.status;
    this.label = object.label;
    this.projet = new ProjetDto(object.projet);
    this.zone = new ZoneDto(object.zone);
    this.constats = object.constats.map(constat => new ConstatDto(constat));
  }
  @ApiProperty()
  readonly id: number;
  @ApiProperty({ enum: StatusEnum, isArray: false })
  readonly status: StatusEnum;
  @ApiProperty()
  readonly date: Date;
  @ApiProperty()
  readonly label: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly projet: ProjetDto;
  @ApiProperty()
  readonly zone: ZoneDto;
  @ApiProperty({
    type: [ConstatDto],
  })
  readonly constats: ConstatDto[];
}
