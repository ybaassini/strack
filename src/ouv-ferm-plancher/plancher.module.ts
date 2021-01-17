import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { PlancherController } from './plancher.controller';
import { PlancherService } from './plancher.service';
import { PlancherSchema } from './schemas/plancher.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Planchers', schema: PlancherSchema }])],
  controllers: [PlancherController],
  providers: [PlancherService],
})
export class PlancherModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
     consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(PlancherController);
   }
}