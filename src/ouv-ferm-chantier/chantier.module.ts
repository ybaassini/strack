import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { ChantierController } from './chantier.controller';
import { ChantierService } from './chantier.service';
import { ChantierSchema } from './schemas/chantier.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Chantiers', schema: ChantierSchema }])],
  controllers: [ChantierController],
  providers: [ChantierService],
})
export class ChantierModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
     consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(ChantierController);
   }
}