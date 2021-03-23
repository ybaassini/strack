import {
  NgModule,
  ModuleWithProviders,
  SkipSelf,
  Optional,
} from "@angular/core";
import { Configuration } from "./configuration";
import { HttpClient } from "@angular/common/http";

import { AdrService } from "./api/adr.service";
import { AppuiConseilService } from "./api/appuiConseil.service";
import { ChantierService } from "./api/chantier.service";
import { ConsigneService } from "./api/consigne.service";
import { DefaultService } from "./api/default.service";
import { Di82Service } from "./api/di82.service";
import { MaterielService } from "./api/materiel.service";
import { PdfService } from "./api/pdf.service";
import { PlancherService } from "./api/plancher.service";
import { PosteService } from "./api/poste.service";
import { ProjetService } from "./api/projet.service";
import { RisqueService } from "./api/risque.service";
import { UserService } from "./api/user.service";
import { ZoneService } from "./api/zone.service";

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    AdrService,
    AppuiConseilService,
    ChantierService,
    ConsigneService,
    DefaultService,
    Di82Service,
    MaterielService,
    PdfService,
    PlancherService,
    PosteService,
    ProjetService,
    RisqueService,
    UserService,
    ZoneService,
  ],
})
export class ApiModule {
  public static forRoot(
    configurationFactory: () => Configuration
  ): ModuleWithProviders<any> {
    return {
      ngModule: ApiModule,
      providers: [{ provide: Configuration, useFactory: configurationFactory }],
    };
  }

  constructor(
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error(
        "ApiModule is already loaded. Import in your base AppModule only."
      );
    }
    if (!http) {
      throw new Error(
        "You need to import the HttpClientModule in your AppModule! \n" +
          "See also https://github.com/angular/angular/issues/20575"
      );
    }
  }
}
