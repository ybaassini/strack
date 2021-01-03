import { NgModule } from '@angular/core';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbInputModule,
  NbListModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { PosteRoutingModule, routedComponents } from './poste-routing.module';

@NgModule({
  imports: [
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbListModule,
    NbAccordionModule,
    NbCheckboxModule,
    NbRadioModule,
    NbSelectModule,
    NbDatepickerModule,
    ThemeModule,
    PosteRoutingModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class PosteModule { }
