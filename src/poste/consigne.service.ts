import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as _ from "lodash";
import { Poste } from "./interfaces/poste.interface";
import { PosteDto } from "./dto/poste.dto";
import { isTypedArray } from "lodash";
import { ConsigneDto } from "../consigne/dto/consigne.dto";

const saltRounds = 10;

@Injectable()
export class ConsigneService {
  constructor(
    @InjectModel("Poste") private readonly posteModel: Model<Poste>
  ) {}

  async findOne(id): Promise<ConsigneDto> {
    const query = { consignes: { $elemMatch: { _id: id } } };
    const poste = await this.posteModel.findOne(query);
    const posteDto = this.deserialize(poste);
    return posteDto.consignes.filter((consigne) => consigne.id === id)[0];
  }

  async create(posteId: number, consigne): Promise<PosteDto> {
    const posteUpdated = await this.posteModel
      .findOneAndUpdate(
        { _id: posteId },
        { $push: { consignes: consigne } },
        { new: true },
      )
      .exec();
    return this.deserialize(posteUpdated);
  }

  async update(posteId: number, consigne): Promise<PosteDto> {
    await this.posteModel.updateOne(
      { _id: posteId },
      { $pull: { consignes: { _id: consigne.id } } }
    );
    const posteUpdated = await this.posteModel
      .findOneAndUpdate(
        { _id: posteId },
        { $push: { consignes: consigne } },
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
