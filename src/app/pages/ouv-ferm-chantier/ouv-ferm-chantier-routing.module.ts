import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ZonesResolver } from "app/@core/resolver";
import { ChantiersResolver } from "app/@core/resolver/ouv-ferm-chantier/ouv-ferm-chantiers.resolver";

import { ChantierComponent } from "./ouv-ferm-chantier.component";
import { ChantierCreateComponent } from "./create/create-ouv-ferm-chantier.component";
import { ChantierReadComponent } from "./read/read-ouv-ferm-chantier.component";

const routes: Routes = [
  {
    path: "",
    component: ChantierComponent,
    children: [
      {
        path: "",
        redirectTo: "read"
      },
      {
        path: "create",
        component: ChantierCreateComponent,
        resolve: {
          zones: ZonesResolver,
        },
      },
      {
        path: "read",
        component: ChantierReadComponent,
        resolve: {
          chantiers: ChantiersResolver,
        },
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChantierRoutingModule {}

export const routedComponents = [
  ChantierComponent,
  ChantierCreateComponent,
  ChantierReadComponent,
];
