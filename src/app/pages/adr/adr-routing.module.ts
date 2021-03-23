import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ZonesResolver } from "app/@core/resolver";
import { AdrsResolver } from "app/@core/resolver/adr-incendie/adr-incendies.resolver";

import { AdrComponent } from "./adr.component";
import { AdrCreateComponent } from "./create/create-adr.component";
import { AdrReadComponent } from "./read/read-adr.component";

const routes: Routes = [
  {
    path: "",
    component: AdrComponent,
    children: [
      {
        path: "",
        redirectTo: "read"
      },
      {
        path: "create",
        component: AdrCreateComponent,
        resolve: {
          zones: ZonesResolver,
        },
      },
      {
        path: "read",
        component: AdrReadComponent,
        resolve: {
          adrs: AdrsResolver,
        },
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdrRoutingModule {}

export const routedComponents = [
  AdrComponent,
  AdrCreateComponent,
  AdrReadComponent,
];
