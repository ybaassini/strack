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
  NbButtonGroupModule,
} from '@nebular/theme';
import { StatusMaterielComponent } from 'app/@theme/components/table/status-materiel-field.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';

import { MaterielRoutingModule, routedComponents } from './materiel-routing.module';

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
    MaterielRoutingModule,
    Ng2SmartTableModule,
    NbButtonGroupModule,
  ],
  declarations: [
    ...routedComponents,
    StatusMaterielComponent,
  ],
  providers: [ { provide: NB_TIME_PICKER_CONFIG, useValue: {} } ],
})
export class MaterielModule { }