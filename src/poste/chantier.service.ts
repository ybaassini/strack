import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as _ from "lodash";
import { Poste } from "./interfaces/poste.interface";
import { PosteDto } from "./dto/poste.dto";
import { isTypedArray } from "lodash";
import { ChantierDto } from "../ouv-ferm-chantier/dto/chantier.dto";

const saltRounds = 10;

@Injectable()
export class ChantierService {
  constructor(
    @InjectModel("Poste") private readonly posteModel: Model<Poste>
  ) {}

  async findOne(id): Promise<ChantierDto> {
    const query = { chantiers: { $elemMatch: { _id: id } } };
    const poste = await this.posteModel.findOne(query);
    const posteDto = this.deserialize(poste);
    return posteDto.chantiers.filter((chantier) => chantier.id === id)[0];
  }

  async create(posteId: number, chantier): Promise<PosteDto> {
    const posteUpdated = await this.posteModel
      .findOneAndUpdate(
        { _id: posteId },
        { $push: { chantiers: chantier } },
        { new: true },
      )
      .exec();
    return this.deserialize(posteUpdated);
  }

  async update(posteId: number, chantier): Promise<PosteDto> {
    await this.posteModel.updateOne(
      { _id: posteId },
      { $pull: { chantiers: { _id: chantier.id } } }
    );
    const posteUpdated = await this.posteModel
      .findOneAndUpdate(
        { _id: posteId },
        { $push: { chantiers: chantier } },
        { new: true },
      )
      .exec();
    return this.deserialize(posteUpdated);
  }

  protected deserialize(document: Poste[]): PosteDto[];
  protected deserialize(document: Poste): PosteDto;
  protected deserialize(document: Poste | Poste[]): PosteDto | PosteDto[] {
    return isTypedArray(document)
      ? (document as Poste[]).map((doc) => new PosteDto(doc))
      : new PosteDto(document);
  }
}
