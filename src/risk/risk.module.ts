import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { RiskController } from './risk.controller';
import { RiskService } from './risk.service';
import { RiskSchema } from './schemas/risk.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'risques', schema: RiskSchema }])],
  controllers: [RiskController],
  providers: [RiskService],
})
export class RiskModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
     consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(RiskController);
   }
}