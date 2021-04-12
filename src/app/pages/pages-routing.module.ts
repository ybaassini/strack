import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { PostesResolver } from 'app/@core/resolver';
import { ConsignesResolver } from 'app/@core/resolver/consigne/consignes.resolver';
import { MaterielsResolver } from 'app/@core/resolver/materiel/materiels.resolver';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      resolve: {
        postes: PostesResolver,
        consignes: ConsignesResolver,
        materiels: MaterielsResolver,
      }
    },
    {
      path: 'menu',
      loadChildren: () => import('./menu/menu.module')
        .then(m => m.MenuModule),
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
      path: 'adrs',
      loadChildren: () => import('./adr/adr.module')
        .then(m => m.AdrModule),
    },
    {
      path: 'appui-conseils',
      loadChildren: () => import('./appui-conseil/appui-conseil.module')
        .then(m => m.AppuiConseilModule),
    },
    {
      path: 'di82s',
      loadChildren: () => import('./di82/di82.module')
        .then(m => m.Di82Module),
    },
    {
      path: 'chantiers',
      loadChildren: () => import('./ouv-ferm-chantier/ouv-ferm-chantier.module')
        .then(m => m.ChantierModule),
    },
    {
      path: 'planchers',
      loadChildren: () => import('./ouv-ferm-plancher/ouv-ferm-plancher.module')
        .then(m => m.PlancherModule),
    },
    {
      path: 'pdfs',
      loadChildren: () => import('./pdf/pdf.module')
        .then(m => m.PdfModule),
    },
    {
      path: 'releves',
      loadChildren: () => import('./releves/releves.module')
        .then(m => m.RelevesModule),
    },
    {
      path: 'indicateur',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'consignes-en-cours',
      loadChildren: () => import('./consigne-en-cours/consigne.module')
        .then(m => m.ConsigneEnCoursModule),
    },
    {
      path: 'constats-en-cours',
      loadChildren: () => import('./constats-en-cours/constat-en-cours.module')
        .then(m => m.ConstatsEnCoursModule),
    },
    {
      path: 'point-materiel-en-cours',
      loadChildren: () => import('./materiel-en-cours/materiel-en-cours.module')
        .then(m => m.MaterielEnCoursModule),
    },
    {
      path: 'rapport',
      loadChildren: () => import('./rapport/rapport.module')
        .then(m => m.RapportModule),
    },
    {
      path: 'materiels',
      loadChildren: () => import('./materiel/materiel.module')
        .then(m => m.MaterielModule),
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
