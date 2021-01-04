import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbTabsetModule,
  NbInputModule,
  NbListModule,
  NbRadioModule,
  NbSelectModule,
  NbTimepickerModule,
  NB_TIME_PICKER_CONFIG,
  NbToggleModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';

import { PosteRoutingModule, routedComponents } from './poste-routing.module';

@NgModule({
  imports: [
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbListModule,
    NbTabsetModule,
    NbAccordionModule,
    NbCheckboxModule,
    NbRadioModule,
    NbTimepickerModule,
    NbSelectModule,
    NbToggleModule,
    NbDatepickerModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    PosteRoutingModule
  ],
  declarations: [
    ...routedComponents,
  ],
  providers:[ { provide:NB_TIME_PICKER_CONFIG, useValue:{} } ]
})
export class PosteModule { }
