import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { PostesResolver } from 'app/@core/resolver';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    // {
    //   path: 'dashboard',
    //   component: ECommerceComponent,
    // },
    {
      path: 'dashboard',
      component: DashboardComponent,
      resolve: {
        postes: PostesResolver
      }
    },
    {
      path: 'poste',
      loadChildren: () => import('./poste/poste.module')
        .then(m => m.PosteModule),
    },
    {
      path: 'consignes',
      loadChildren: () => import('./consigne/consigne.module')
        .then(m => m.ConsigneModule),
    },
    {
      path: 'releves',
      loadChildren: () => import('./releves/releves.module')
        .then(m => m.RelevesModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
