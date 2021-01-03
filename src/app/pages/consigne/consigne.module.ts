import { NgModule } from '@angular/core';
import { NbButtonModule, NbCardModule, NbListModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { ConsigneRoutingModule, routedComponents } from './consigne-routing.module';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
    NbButtonModule,
    NbListModule,
    ConsigneRoutingModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ConsigneModule { }
