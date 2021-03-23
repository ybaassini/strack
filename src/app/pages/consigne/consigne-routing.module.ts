import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ZonesResolver } from "app/@core/resolver";
import { ConsignesResolver } from "app/@core/resolver/consigne/consignes.resolver";

import { ConsigneComponent } from "./consigne.component";
import { ConsigneCreateComponent } from "./create/create-consigne.component";
import { ConsigneReadComponent } from "./read/read-consigne.component";

const routes: Routes = [
  {
    path: "",
    component: ConsigneComponent,
    children: [
      {
        path: "",
        redirectTo: "read"
      },
      {
        path: "create",
        component: ConsigneCreateComponent,
        resolve: {
          zones: ZonesResolver,
        },
      },
      {
        path: "read",
        component: ConsigneReadComponent,
        resolve: {
          consignes: ConsignesResolver,
        },
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsigneRoutingModule {}

export const routedComponents = [
  ConsigneComponent,
  ConsigneCreateComponent,
  ConsigneReadComponent,
];
