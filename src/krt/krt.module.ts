import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { KrtController } from './krt.controller';
import { KrtService } from './krt.service';
import { KrtSchema } from './schemas/krt.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Krt', schema: KrtSchema }])],
  controllers: [KrtController],
  providers: [KrtService],
})
export class KrtModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
     consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(KrtController);
   }
}