import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { ZoneController } from './zone.controller';
import { ZoneService } from './zone.service';
import { ZoneSchema } from './schemas/zone.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Zones', schema: ZoneSchema }])],
  controllers: [ZoneController],
  providers: [ZoneService],
})
export class ZoneModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
     consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(ZoneController);
   }
}