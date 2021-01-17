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
import { PlancherService } from './plancher.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { PlancherDto } from './dto/plancher.dto';
import { CreatePlancherDto } from './dto/create-plancher.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Plancher')
@Controller('api/planchers')
// @UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class PlancherController {
  constructor(
    private readonly plancherService: PlancherService) {}

  @Get('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getPlanchers(@Body() request = {}): Promise<IResponse | PlancherDto[]> {
    try {
      const documents = await this.plancherService.find(request);
      const planchers = documents.map((document) => new PlancherDto(document));
      return planchers;
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  // @ApiParam({name: 'id', type: 'string'})
  async getPlancher(@Param('id') id: string): Promise<IResponse | PlancherDto> {
    try {
      const plancher = await this.plancherService.findOne({id: +id});
      return new PlancherDto(plancher);
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('')
  // @Roles('User')
  async createPlancher(@Body() plancher: CreatePlancherDto): Promise<IResponse | PlancherDto> {
    try {
      const document = await this.plancherService.create(plancher);
      // await this.baliseService.initBalisePlancher(document.id);
      return new PlancherDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

  @Put('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async updatePlancher(@Body() plancher: PlancherDto): Promise<IResponse | PlancherDto> {
    try {
      const document = await this.plancherService.update(plancher);
      return new PlancherDto(document);
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

}
