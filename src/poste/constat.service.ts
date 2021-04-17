import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as _ from "lodash";
import { Poste } from "./interfaces/poste.interface";
import { ConstatDto } from "./dto/constat.dto";
import { PosteDto } from "./dto/poste.dto";
import { isTypedArray } from "lodash";

const saltRounds = 10;

@Injectable()
export class ConstatService {
  constructor(
    @InjectModel("Poste") private readonly posteModel: Model<Poste>
  ) {}

  async findOne(id): Promise<ConstatDto> {
    const query = { constats: { $elemMatch: { _id: id } } };
    const poste = await this.posteModel.findOne(query);
    const posteDto = this.deserialize(poste);
    return posteDto.constats.filter((constat) => constat.id === id)[0];
  }

  async create(posteId: number, constat): Promise<PosteDto> {
    const posteUpdated = await this.posteModel
      .findOneAndUpdate(
        { _id: posteId },
        { $push: { constats: constat } },
        { new: true },
      )
      .exec();
    return this.deserialize(posteUpdated);
  }

  async update(posteId: number, constat): Promise<PosteDto> {
    await this.posteModel.updateOne(
      { _id: posteId },
      { $pull: { constats: { _id: constat.id } } }
    );
    const posteUpdated = await this.posteModel
      .findOneAndUpdate(
        { _id: posteId },
        { $push: { constats: constat } },
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
