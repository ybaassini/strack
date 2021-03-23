import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ZonesResolver } from "app/@core/resolver";
import { Di82sResolver } from "app/@core/resolver/di82/di82s.resolver";

import { Di82Component } from "./di82.component";
import { Di82CreateComponent } from "./create/create-di82.component";
import { Di82ReadComponent } from "./read/read-di82.component";

const routes: Routes = [
  {
    path: "",
    component: Di82Component,
    children: [
      {
        path: "",
        redirectTo: "read"
      },
      {
        path: "create",
        component: Di82CreateComponent,
        resolve: {
          zones: ZonesResolver,
        },
      },
      {
        path: "read",
        component: Di82ReadComponent,
        resolve: {
          di82s: Di82sResolver,
        },
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Di82RoutingModule {}

export const routedComponents = [
  Di82Component,
  Di82CreateComponent,
  Di82ReadComponent,
];
