import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateBaliseDto } from './dto/create-balise.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Balise } from './interfaces/balise.interface';
import { BaliseDto } from './dto/balise.dto';
import { SURVEILLANCE_GLOBALE } from 'common/data/balise.data';

const saltRounds = 10;

@Injectable()
export class BaliseService {
  constructor(
    @InjectModel('Balise') private readonly baliseModel: Model<Balise>,
  ) {}

  async findAll(): Promise<Balise[]> {
    return await this.baliseModel.find().exec();
  }

  async find(query: {} = {}): Promise<Balise[]> {
    return await this.baliseModel
    .find(query)
    .populate('poste')
    .exec();
  }

  async findOne(query: {} = {}): Promise<Balise> {
    return await this.baliseModel.findOne(query).exec();
  }

  async initBalisePoste(posteId: number) {
    SURVEILLANCE_GLOBALE.forEach(async balise => {
      const baliseToSave = {...balise, poste: `${posteId}`} as CreateBaliseDto;
      await this.create(baliseToSave);
    });
  }

  async create(balise: CreateBaliseDto): Promise<Balise> {
    const doc = new this.baliseModel(balise);
    const document = await this.baliseModel.create(doc);
    return document;
  }

  async update(newBalise: BaliseDto): Promise<Balise> {
    const newBaliseDocument = await this.baliseModel.updateOne(
      { id: newBalise.id },
      new this.baliseModel(newBalise),
    );

    return newBaliseDocument;
  }
}
