import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostesResolver } from "app/@core/resolver";

import { ConstatEnCoursComponent } from "./constat.component";
import { ConstatEnCoursReadComponent } from "./read/read-constat.component";

const routes: Routes = [
  {
    path: "",
    component: ConstatEnCoursComponent,
    children: [
      {
        path: "",
        redirectTo: "read"
      },
      {
        path: "read",
        component: ConstatEnCoursReadComponent,
        resolve: {
          postes: PostesResolver,
        },
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConstatRoutingModule {}

export const routedComponents = [
  ConstatEnCoursComponent,
  ConstatEnCoursReadComponent,
];
