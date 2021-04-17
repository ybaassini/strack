import { UserDto } from "../../users/dto/user.dto";
import { StatusEnum } from "../../common/enum";
import { ProjetDto } from "../../projet/dto/projet.dto";
import { ZoneDto } from "../../zone/dto/zone.dto";
import { ConstatDto } from "./constat.dto";
import { ApiProperty } from "@nestjs/swagger";
import { MaterielDto } from "materiel/dto/materiel.dto";
import { ConsigneDto } from "consigne/dto/consigne.dto";
import { PdfDto } from "pdf/dto/pdf.dto";
import { ChantierDto } from "ouv-ferm-chantier/dto/chantier.dto";
import { PlancherDto } from "ouv-ferm-plancher/dto/plancher.dto";
import { KrtDto } from "krt/dto/krt.dto";
import { Di82Dto } from "di82/dto/di82.dto";
import { BaliseDto } from "balise/dto/balise.dto";

export class PosteDto {
  constructor(object: any) {
    const id = object._id.toHexString();
    this.id = id;
    this.date = object.date;
    this.email = object.email;
    this.status = object.status;
    this.label = object.label;
    this.constats = object.constats.map(constat => new ConstatDto(constat));
    this.materiels = object.materiels.map(materiel => new MaterielDto(materiel));
    this.consignes = object.consignes.map(consigne => new ConsigneDto(consigne));
    this.pdfs = object.pdfs.map(pdf => new PdfDto(pdf));
    this.chantiers = object.chantiers.map(chantier => new ChantierDto(chantier));
    this.planchers = object.planchers.map(plancher => new PlancherDto(plancher));
    this.krts = object.krts.map(krt => new KrtDto(krt));
    this.di82s = object.di82s.map(di82 => new Di82Dto(di82));
    this.balises = object.balises.map(balise => new BaliseDto(balise));
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
  @ApiProperty({
    type: [ConstatDto],
  })
  readonly constats: ConstatDto[];
  @ApiProperty({
    type: [MaterielDto],
  })
  readonly materiels: MaterielDto[];
  @ApiProperty({
    type: [ConsigneDto],
  })
  readonly consignes: ConsigneDto[];
  @ApiProperty({
    type: [PdfDto],
  })
  readonly pdfs: PdfDto[];
  @ApiProperty({
    type: [ChantierDto],
  })
  readonly chantiers: ChantierDto[];
  @ApiProperty({
    type: [PlancherDto],
  })
  readonly planchers: PlancherDto[];
  @ApiProperty({
    type: [KrtDto],
  })
  readonly krts: KrtDto[];
  @ApiProperty({
    type: [Di82Dto],
  })
  readonly di82s: Di82Dto[];
  @ApiProperty({
    type: [BaliseDto],
  })
  readonly balises: BaliseDto[];
}
