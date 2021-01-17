import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateZoneDto } from './dto/create-zone.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as _ from 'lodash';
import { Zone } from './interfaces/zone.interface';
import { ZoneDto } from './dto/zone.dto';

const saltRounds = 10;

@Injectable()
export class ZoneService {
  constructor(
    @InjectModel('Zones') private readonly zoneModel: Model<Zone>,
  ) {}

  async findAll(): Promise<Zone[]> {
    return await this.zoneModel.find().exec();
  }

  async find(query: {} = {}): Promise<Zone[]> {
    return await this.zoneModel
    .find(query)
    .populate('projet')
    .exec();
  }

  async findOne(query: {} = {}): Promise<Zone> {
    return await this.zoneModel.findOne(query).exec();
  }

  async create(zone: CreateZoneDto): Promise<Zone> {
    const doc = new this.zoneModel(zone);
    const document = await this.zoneModel.create(doc);
    return document;
  }

  async update(newZone: ZoneDto): Promise<Zone> {
    const newZoneDocument = await this.zoneModel.updateOne(
      { id: newZone.id },
      new this.zoneModel(newZone),
    );

    return newZoneDocument;
  }
}
