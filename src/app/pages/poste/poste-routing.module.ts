import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostesResolver } from 'app/@core/resolver';
import { ConstatComponent } from "./constat/constat.component";

import { PosteComponent } from "./poste.component";

const routes: Routes = [
  {
    path: "",
    component: PosteComponent,
    resolve: {
      postes: PostesResolver
    }
  },
  {
    path: "poste/constat",
    component: ConstatComponent,
  },
  {
    path: "poste/constat/:constatId",
    component: ConstatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PosteRoutingModule {}

export const routedComponents = [PosteComponent, ConstatComponent];
