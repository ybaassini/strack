import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateKrtDto } from './dto/create-krt.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Krt } from './interfaces/krt.interface';
import { KrtDto } from './dto/krt.dto';
import { SURVEILLANCE_GLOBALE } from 'common/data/krt.data';

const saltRounds = 10;

@Injectable()
export class KrtService {
  constructor(
    @InjectModel('Krt') private readonly krtModel: Model<Krt>,
  ) {}

  async findAll(): Promise<Krt[]> {
    return await this.krtModel.find().exec();
  }

  async find(query: {} = {}): Promise<Krt[]> {
    return await this.krtModel
    .find(query)
    .populate('projet')
    .exec();
  }

  async findOne(query: {} = {}): Promise<Krt> {
    return await this.krtModel.findOne(query).exec();
  }

  async initKrtPoste(posteId: number) {
    SURVEILLANCE_GLOBALE.forEach(async krt => {
      const krtToSave = {...krt, poste: `${posteId}`} as CreateKrtDto;
      await this.create(krtToSave);
    });
  }

  async create(krt: CreateKrtDto): Promise<Krt> {
    const doc = new this.krtModel(krt);
    const document = await this.krtModel.create(doc);
    return document;
  }

  async update(newKrt: KrtDto): Promise<Krt> {
    const newKrtDocument = await this.krtModel.updateOne(
      { id: newKrt.id },
      new this.krtModel(newKrt),
    );

    return newKrtDocument;
  }
}
