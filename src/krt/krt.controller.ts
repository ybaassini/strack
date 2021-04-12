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
import { KrtService } from './krt.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { KrtDto } from './dto/krt.dto';
import { CreateKrtDto } from './dto/create-krt.dto';

@Controller('krts')
@UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class KrtController {
  constructor(private readonly krtService: KrtService) {}

  @Get('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getKrts(@Body() request = {}): Promise<IResponse> {
    try {
      const documents = await this.krtService.find(request);
      const krts = documents.map((document) => new KrtDto(document));
      return new ResponseSuccess('COMMON.SUCCESS', krts);
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getKrt(@Param('id') id: string): Promise<IResponse> {
    try {
      const krt = await this.krtService.findOne({ id: +id });
      return new ResponseSuccess('COMMON.SUCCESS', new KrtDto(krt));
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('')
  // @Roles('User')
  async createKrt(@Body() krt: CreateKrtDto): Promise<IResponse> {
    try {
      const document = await this.krtService.create(krt);
      return new ResponseSuccess(
        'PROFILE.UPDATE_SUCCESS',
        new KrtDto(document),
      );
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

}
