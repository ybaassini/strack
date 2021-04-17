import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MaterielsByPosteResolver } from "app/@core/resolver/materiel/materiels-by-poste.resolver";
import { MaterielsByZoneResolver } from "app/@core/resolver/materiel/materiels-by-zone.resolver";

import { MaterielComponent } from "./materiel.component";

const routes: Routes = [
  {
    path: "",
    component: MaterielComponent,
    resolve: {
      currentMateriels: MaterielsByPosteResolver,
      historyMateriels: MaterielsByZoneResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterielRoutingModule {}

export const routedComponents = [MaterielComponent];
