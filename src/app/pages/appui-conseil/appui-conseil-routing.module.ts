import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ZonesResolver } from "app/@core/resolver";
import { AppuiConseilsResolver } from "app/@core/resolver/appui-conseil/appui-conseils.resolver";

import { AppuiConseilComponent } from "./appui-conseil.component";
import { AppuiConseilCreateComponent } from "./create/create-appui-conseil.component";
import { AppuiConseilReadComponent } from "./read/read-appui-conseil.component";

const routes: Routes = [
  {
    path: "",
    component: AppuiConseilComponent,
    children: [
      {
        path: "",
        redirectTo: "read"
      },
      {
        path: "create",
        component: AppuiConseilCreateComponent,
        resolve: {
          zones: ZonesResolver,
        },
      },
      {
        path: "read",
        component: AppuiConseilReadComponent,
        resolve: {
          appuiConseils: AppuiConseilsResolver,
        },
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppuiConseilRoutingModule {}

export const routedComponents = [
  AppuiConseilComponent,
  AppuiConseilCreateComponent,
  AppuiConseilReadComponent,
];
