import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  Param,
  Put,
} from '@nestjs/common';
import { ZoneService } from './zone.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { ZoneDto } from './dto/zone.dto';
import { CreateZoneDto } from './dto/create-zone.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Zone')
@Controller('api/zones')
// @UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) {}

  @Get('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getZones(@Body() request = {}): Promise<IResponse> {
    try {
      const documents = await this.zoneService.find(request);
      const zones = documents.map((document) => new ZoneDto(document));
      return new ResponseSuccess('COMMON.SUCCESS', zones);
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getZone(@Param('id') id: string): Promise<IResponse> {
    try {
      const zone = await this.zoneService.findOne({ id: +id });
      return new ResponseSuccess('COMMON.SUCCESS', new ZoneDto(zone));
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('')
  // @Roles('User')
  async createZone(@Body() zone: CreateZoneDto): Promise<IResponse> {
    try {
      const document = await this.zoneService.create(zone);
      return new ResponseSuccess(
        'PROFILE.UPDATE_SUCCESS',
        new ZoneDto(document),
      );
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

}
