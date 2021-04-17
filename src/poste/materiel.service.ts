import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Poste } from './interfaces/poste.interface';
import { PosteDto } from './dto/poste.dto';
import { isTypedArray } from 'lodash';
import { MaterielDto } from '../materiel/dto/materiel.dto';
import { MATERIELS } from 'common/data/materiel.data';

const saltRounds = 10;

@Injectable()
export class MaterielService {
  constructor(
    @InjectModel('Poste') private readonly posteModel: Model<Poste>,
  ) {}

  async findOne(id): Promise<MaterielDto> {
    const query = { materiels: { $elemMatch: { _id: id } } };
    const poste = await this.posteModel.findOne(query);
    const posteDto = this.deserialize(poste);
    return posteDto.materiels.filter((materiel) => materiel.id === id)[0];
  }

  async create(posteId: number, materiel): Promise<PosteDto> {
    const posteUpdated = await this.posteModel
      .findOneAndUpdate(
        { _id: posteId },
        { $push: { materiels: materiel } },
        { new: true },
      )
      .exec();
    return this.deserialize(posteUpdated);
  }

  async update(posteId: number, materiel): Promise<PosteDto> {
    await this.posteModel.updateOne(
      { _id: posteId },
      { $pull: { materiels: { _id: materiel.id } } },
    );
    const posteUpdated = await this.posteModel
      .findOneAndUpdate(
        { _id: posteId },
        { $push: { materiels: materiel } },
        { new: true },
      )
      .exec();
    return this.deserialize(posteUpdated);
  }

  async initMaterielPoste(posteId: number) {
    MATERIELS.forEach(async (materiel) => {
      await this.create(posteId, materiel);
    });
  }

  protected deserialize(document: Poste[]): PosteDto[];
  protected deserialize(document: Poste): PosteDto;
  protected deserialize(document: Poste | Poste[]): PosteDto | PosteDto[] {
    return isTypedArray(document)
      ? (document as Poste[]).map((doc) => new PosteDto(doc))
      : new PosteDto(document);
  }
}
