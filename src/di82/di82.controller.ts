import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  Param,
  Put,
  Response,
  Res,
} from '@nestjs/common';
import { Di82Service } from './di82.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { Di82Dto } from './dto/di82.dto';
import { CreateDi82Dto } from './dto/create-di82.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Di82')
@Controller('api/di82s')
// @UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class Di82Controller {
  constructor(
    private readonly di82Service: Di82Service) {}

  @Get('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getDi82s(@Body() request = {}): Promise<IResponse | Di82Dto[]> {
    try {
      const documents = await this.di82Service.find(request);
      const di82s = documents.map((document) => new Di82Dto(document));
      return di82s;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  // @ApiParam({name: 'id', type: 'string'})
  async getDi82(@Param('id') id: string): Promise<IResponse | Di82Dto> {
    try {
      const di82 = await this.di82Service.findOne({id: +id});
      return new Di82Dto(di82);
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('')
  // @Roles('User')
  async createDi82(@Body() di82: CreateDi82Dto): Promise<IResponse | Di82Dto> {
    try {
      const document = await this.di82Service.create(di82);
      // await this.baliseService.initBaliseDi82(document.id);
      return new Di82Dto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async updateDi82(@Body() di82: Di82Dto): Promise<IResponse | Di82Dto> {
    try {
      const document = await this.di82Service.update(di82);
      return new Di82Dto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

}
