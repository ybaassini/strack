import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MaterielsResolver } from "app/@core/resolver/materiel/materiels.resolver";

import { MaterielEnCoursComponent } from "./materiel-en-cours.component";

const routes: Routes = [
  {
    path: "",
    component: MaterielEnCoursComponent,
    resolve: {
      materiels: MaterielsResolver,
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterielRoutingModule {}

export const routedComponents = [MaterielEnCoursComponent];
