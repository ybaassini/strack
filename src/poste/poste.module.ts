import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { LoggerMiddleware } from "../common/middlewares/logger.middleware";
import { PosteController } from "./poste.controller";
import {
  BaliseService,
  ChantierService,
  ConsigneService,
  ConstatService,
  Di82Service,
  KrtService,
  MaterielService,
  PdfService,
  PlancherService,
  PosteService,
} from "./";
import { PosteSchema } from "./schemas/poste.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Poste", schema: PosteSchema }]),
  ],
  controllers: [PosteController],
  providers: [
    PosteService,
    ConstatService,
    MaterielService,
    Di82Service,
    ChantierService,
    KrtService,
    PdfService,
    PlancherService,
    ConsigneService,
    BaliseService,
  ],
})
export class PosteModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude(
      //   { path: 'example', method: RequestMethod.GET },
      // )
      .forRoutes(PosteController);
  }
}
