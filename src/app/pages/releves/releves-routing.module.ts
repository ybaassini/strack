import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaliseComponent } from './balise/balise.component';
import { C2Component } from './C2/c2.component';
import { KRTComponent } from './krt/krt.component';

import { RelevesComponent } from './releves.component';

const routes: Routes = [{
  path: '',
  component: RelevesComponent,
  children: [
    {
      path: 'balise',
      component: BaliseComponent,
    },
    {
      path: 'kr',
      component: KRTComponent,
    },
    {
      path: 'c2',
      component: C2Component,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RelevesRoutingModule { }

export const routedComponents = [
  RelevesComponent,
  BaliseComponent,
  KRTComponent,
  C2Component
];
