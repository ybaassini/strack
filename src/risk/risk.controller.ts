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
import { RiskService } from './risk.service';
import { IResponse } from '../common/interfaces/response.interface';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { RiskDto } from './dto/risk.dto';
import { CreateRiskDto } from './dto/create-risk.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Risque')
@Controller('api/risques')
// @UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class RiskController {
  constructor(private readonly riskService: RiskService) {}

  @Get('')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getRisques(@Body() request = {}): Promise<IResponse> {
    try {
      const documents = await this.riskService.find({});
      const risks = documents.map((document) => new RiskDto(document));
      return new ResponseSuccess('COMMON.SUCCESS', risks);
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Get('/:id')
  // @UseGuards(RolesGuard)
  // @Roles('User')
  async getRisque(@Param('id') id: string): Promise<IResponse> {
    try {
      const risk = await this.riskService.findOne({id: +id});
      return new ResponseSuccess('COMMON.SUCCESS', new RiskDto(risk));
    } catch (error) {
      return new ResponseError('COMMON.ERROR.GENERIC_ERROR', error);
    }
  }

  @Post('')
  // @Roles('User')
  async createRisque(@Body() risk: CreateRiskDto): Promise<IResponse> {
    try {
      const document = await this.riskService.create(risk);
      return new ResponseSuccess(
        'PROFILE.UPDATE_SUCCESS',
        new RiskDto(document),
      );
    } catch (error) {
      return new ResponseError('PROFILE.UPDATE_ERROR', error);
    }
  }

}
