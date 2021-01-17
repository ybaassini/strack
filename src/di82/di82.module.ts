import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { Di82Controller } from './di82.controller';
import { Di82Service } from './di82.service';
import { Di82Schema } from './schemas/di82.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Di82s', schema: Di82Schema }])],
  controllers: [Di82Controller],
  providers: [Di82Service],
})
export class Di82Module implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
     consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(Di82Controller);
   }
}