import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MaterielsByPosteResolver } from "app/@core/resolver/materiel/materiels-by-poste.resolver";

import { MaterielEnCoursComponent } from "./materiel-en-cours.component";

const routes: Routes = [
  {
    path: "",
    component: MaterielEnCoursComponent,
    resolve: {
      currentMateriels: MaterielsByPosteResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterielRoutingModule {}

export const routedComponents = [MaterielEnCoursComponent];
