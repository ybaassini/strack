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
import { ChantierService } from './chantier.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { ChantierDto } from './dto/chantier.dto';
import { CreateChantierDto } from './dto/create-chantier.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Chantier')
@Controller('api/chantiers')
// @UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class ChantierController {
  constructor(
    private readonly chantierService: ChantierService) {}

  @Get('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getChantiers(@Body() request = {}): Promise<IResponse | ChantierDto[]> {
    try {
      const documents = await this.chantierService.find(request);
      const chantiers = documents.map((document) => new ChantierDto(document));
      return chantiers;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  // @ApiParam({name: 'id', type: 'string'})
  async getChantier(@Param('id') id: string): Promise<IResponse | ChantierDto> {
    try {
      const chantier = await this.chantierService.findOne({id: +id});
      return new ChantierDto(chantier);
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('')
  // @Roles('User')
  async createChantier(@Body() chantier: CreateChantierDto): Promise<IResponse | ChantierDto> {
    try {
      const document = await this.chantierService.create(chantier);
      // await this.baliseService.initBaliseChantier(document.id);
      return new ChantierDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async updateChantier(@Body() chantier: ChantierDto): Promise<IResponse | ChantierDto> {
    try {
      const document = await this.chantierService.update(chantier);
      return new ChantierDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

}
