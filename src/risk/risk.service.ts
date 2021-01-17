import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateRiskDto } from './dto/create-risk.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Risk } from './interfaces/risk.interface';
import { RiskDto } from './dto/risk.dto';

const saltRounds = 10;

@Injectable()
export class RiskService {
  constructor(
    @InjectModel('risques') private readonly riskModel: Model<Risk>,
  ) {}

  async findAll(): Promise<Risk[]> {
    return await this.riskModel.find().exec();
  }

  async find(query: {} = {}): Promise<Risk[]> {
    return await this.riskModel.find(query).exec();
  }

  async findOne(query: {} = {}): Promise<Risk> {
    return await this.riskModel.findOne(query).exec();
  }

  async create(risk: CreateRiskDto): Promise<Risk> {
    const doc = new this.riskModel(risk);
    const document = await this.riskModel.create(doc);
    return document;
  }

  async update(newRisk: RiskDto): Promise<Risk> {
    const newRiskDocument = await this.riskModel.updateOne(
      { id: newRisk.id },
      new this.riskModel(newRisk),
    );

    return newRiskDocument;
  }
}
