import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsigneCAComponent } from './ca/consigne-ca.component';

import { ConsigneComponent } from './consigne.component';
import { ConsigneRZComponent } from './rz/consigne-rz.component';

const routes: Routes = [{
  path: '',
  component: ConsigneComponent,
  children: [{
    path: 'ca-rz',
    component: ConsigneCAComponent,
  }, {
    path: 'rz-rz',
    component: ConsigneRZComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsigneRoutingModule { }

export const routedComponents = [
  ConsigneComponent,
  ConsigneCAComponent,
  ConsigneRZComponent,
];
