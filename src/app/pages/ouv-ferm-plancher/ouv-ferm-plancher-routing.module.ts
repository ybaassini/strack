import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ZonesResolver } from "app/@core/resolver";
import { PlanchersResolver } from "app/@core/resolver/ouv-ferm-plancher/ouv-ferm-planchers.resolver";

import { PlancherComponent } from "./ouv-ferm-plancher.component";
import { PlancherCreateComponent } from "./create/create-ouv-ferm-plancher.component";
import { PlancherReadComponent } from "./read/read-ouv-ferm-plancher.component";

const routes: Routes = [
  {
    path: "",
    component: PlancherComponent,
    children: [
      {
        path: "",
        redirectTo: "read"
      },
      {
        path: "create",
        component: PlancherCreateComponent,
        resolve: {
          zones: ZonesResolver,
        },
      },
      {
        path: "read",
        component: PlancherReadComponent,
        resolve: {
          planchers: PlanchersResolver,
        },
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlancherRoutingModule {}

export const routedComponents = [
  PlancherComponent,
  PlancherCreateComponent,
  PlancherReadComponent,
];
