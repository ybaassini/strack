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
import { BaliseService } from './balise.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { BaliseDto } from './dto/balise.dto';
import { CreateBaliseDto } from './dto/create-balise.dto';

@Controller('balises')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class BaliseController {
  constructor(private readonly baliseService: BaliseService) {}

  @Get('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getBalises(@Body() request = {}): Promise<IResponse> {
    try {
      const documents = await this.baliseService.find(request);
      const balises = documents.map((document) => new BaliseDto(document));
      return new ResponseSuccess('COMMON.SUCCESS', balises);
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getBalise(@Param('id') id: string): Promise<IResponse> {
    try {
      const balise = await this.baliseService.findOne({ id: +id });
      return new ResponseSuccess('COMMON.SUCCESS', new BaliseDto(balise));
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('')
  // @Roles('User')
  async createBalise(@Body() balise: CreateBaliseDto): Promise<IResponse> {
    try {
      const document = await this.baliseService.create(balise);
      return new ResponseSuccess(
        'PROFILE.UPDATE_SUCCESS',
        new BaliseDto(document),
      );
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

}
