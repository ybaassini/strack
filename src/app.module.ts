import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { default as config } from "./config";
import { PosteModule } from "./poste/poste.module";
import { ProjetModule } from "./projet/projet.module";
import { ZoneModule } from "./zone/zone.module";
import { RiskModule } from "./risk/risk.module";
import { ConsigneModule } from "consigne/consigne.module";
import { AppuiConseilModule } from "appui-conseil/appui-conseil.module";
import { Di82Module } from "di82/di82.module";
import { MaterielModule } from "materiel/materiel.module";
import { ChantierModule } from "ouv-ferm-chantier/chantier.module";
import { PlancherModule } from "ouv-ferm-plancher/plancher.module";
import { PdfModule } from "pdf/pdf.module";
import { AdrModule } from "adr/adr.module";
import { BaliseModule } from "balise/balise.module";

const userString =
  config.db.user && config.db.pass
    ? config.db.user + ":" + config.db.pass + "@"
    : "";
const authSource = config.db.authSource
  ? "?authSource=" + config.db.authSource + "&w=1"
  : "";

@Module({
  imports: [
    MongooseModule.forRoot(config.db.host, { useNewUrlParser: true }),
    UsersModule,
    PosteModule,
    ProjetModule,
    ZoneModule,
    RiskModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
