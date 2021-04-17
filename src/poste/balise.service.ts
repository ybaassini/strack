import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Poste } from './interfaces/poste.interface';
import { PosteDto } from './dto/poste.dto';
import { isTypedArray } from 'lodash';
import { BaliseDto } from '../balise/dto/balise.dto';
import { SURVEILLANCE_GLOBALE } from 'common/data/balise.data';

const saltRounds = 10;

@Injectable()
export class BaliseService {
  constructor(
    @InjectModel('Poste') private readonly posteModel: Model<Poste>,
  ) {}

  async findOne(id): Promise<BaliseDto> {
    const query = { balises: { $elemMatch: { _id: id } } };
    const poste = await this.posteModel.findOne(query);
    const posteDto = this.deserialize(poste);
    return posteDto.balises.filter((balise) => balise.id === id)[0];
  }

  async create(posteId: number, balise): Promise<PosteDto> {
    const posteUpdated = await this.posteModel
      .findOneAndUpdate(
        { _id: posteId },
        { $push: { balises: balise } },
        { new: true },
      )
      .exec();
    return this.deserialize(posteUpdated);
  }

  async update(posteId: number, balise): Promise<PosteDto> {
    await this.posteModel.updateOne(
      { _id: posteId },
      { $pull: { balises: { _id: balise.id } } },
    );
    const posteUpdated = await this.posteModel
      .findOneAndUpdate(
        { _id: posteId },
        { $push: { balises: balise } },
        { new: true },
      )
      .exec();
    return this.deserialize(posteUpdated);
  }

  async initBalisePoste(posteId: number) {
    SURVEILLANCE_GLOBALE.forEach(async balise => {
      await this.create(posteId, balise);
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
