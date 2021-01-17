import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateProjetDto } from './dto/create-projet.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Projet } from './interfaces/projet.interface';
import { ProjetDto } from './dto/projet.dto';

const saltRounds = 10;

@Injectable()
export class ProjetService {
  constructor(
    @InjectModel('Projets') private readonly projetModel: Model<Projet>,
  ) {}

  async findAll(): Promise<Projet[]> {
    return await this.projetModel.find().exec();
  }

  async find(query: {} = {}): Promise<Projet[]> {
    return await this.projetModel.find(query).exec();
  }

  async findOne(query: {} = {}): Promise<Projet> {
    return await this.projetModel.findOne(query).exec();
  }

  async create(projet: CreateProjetDto): Promise<Projet> {
    const doc = new this.projetModel(projet);
    const document = await this.projetModel.create(doc);
    return document;
  }

  async update(newProjet: ProjetDto): Promise<Projet> {
    const newProjetDocument = await this.projetModel.updateOne(
      { id: newProjet.id },
      new this.projetModel(newProjet),
    );

    return newProjetDocument;
  }
}
