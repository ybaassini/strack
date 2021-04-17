import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import * as _ from "lodash";
import { Poste } from "./interfaces/poste.interface";
import { PosteDto } from "./dto/poste.dto";
import { isTypedArray } from "lodash";
import { PdfDto } from "../pdf/dto/pdf.dto";

const saltRounds = 10;

@Injectable()
export class PdfService {
  constructor(
    @InjectModel("Poste") private readonly posteModel: Model<Poste>
  ) {}

  async findOne(id): Promise<PdfDto> {
    const query = { pdfs: { $elemMatch: { _id: id } } };
    const poste = await this.posteModel.findOne(query);
    const posteDto = this.deserialize(poste);
    return posteDto.pdfs.filter((pdf) => pdf.id === id)[0];
  }

  async create(posteId: number, pdf): Promise<PosteDto> {
    const posteUpdated = await this.posteModel
      .findOneAndUpdate(
        { _id: posteId },
        { $push: { pdfs: pdf } },
        { new: true },
      )
      .exec();
    return this.deserialize(posteUpdated);
  }

  async update(posteId: number, pdf): Promise<PosteDto> {
    await this.posteModel.updateOne(
      { _id: posteId },
      { $pull: { pdfs: { _id: pdf.id } } }
    );
    const posteUpdated = await this.posteModel
      .findOneAndUpdate(
        { _id: posteId },
        { $push: { pdfs: pdf } },
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
