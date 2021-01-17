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
import { ConsigneService } from './consigne.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { ConsigneDto } from './dto/consigne.dto';
import { CreateConsigneDto } from './dto/create-consigne.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Consigne')
@Controller('api/consignes')
// @UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class ConsigneController {
  constructor(
    private readonly consigneService: ConsigneService) {}

  @Get('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getConsignes(@Body() request = {}): Promise<IResponse | ConsigneDto[]> {
    try {
      const documents = await this.consigneService.find(request);
      const consignes = documents.map((document) => new ConsigneDto(document));
      return consignes;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  // @ApiParam({name: 'id', type: 'string'})
  @ApiResponse({
    type: ConsigneDto,
    status: 200,
  })
  async getConsigne(@Param('id') id: string): Promise<IResponse | ConsigneDto> {
    try {
      const consigne = await this.consigneService.findOne({id: +id});
      return new ConsigneDto(consigne);
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('')
  // @Roles('User')
  async createConsigne(@Body() consigne: CreateConsigneDto): Promise<IResponse | ConsigneDto> {
    try {
      const document = await this.consigneService.create(consigne);
      // await this.baliseService.initBaliseConsigne(document.id);
      return new ConsigneDto(document);
    } catch (error) {
      return new ResponseError('CONSIGNE.CREATE_ERROR', error);
    }
  }

  @Put('/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async updateConsigne(
    @Param('id') id: string,
    @Body() consigne: CreateConsigneDto): Promise<IResponse> {
    try {
      const document = await this.consigneService.update(id, consigne);
      return new ResponseSuccess('CONSIGNE.UPDATE_SUCCESS', document);
    } catch (error) {
      return new ResponseError('CONSIGNE.UPDATE_ERROR', error);
    }
  }

}
