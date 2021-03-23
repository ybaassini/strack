import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbAccordionModule, NbBadgeModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbDialogModule, NbInputModule, NbListModule, NbRadioModule, NbSelectModule, NbTabsetModule, NbTimepickerModule, NbToggleModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';

import { ConsigneRoutingModule, routedComponents } from './consigne-routing.module';
@NgModule({
  imports: [
    NbCardModule,
    NbButtonModule,
    NbInputModule,
    NbToggleModule,
    NbListModule,
    NbTabsetModule,
    NbAccordionModule,
    NbCheckboxModule,
    NbRadioModule,
    NbTimepickerModule,
    NbBadgeModule,
    NbSelectModule,
    NbToggleModule,
    NbDatepickerModule,
    ThemeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ConsigneRoutingModule,
    Ng2SmartTableModule,
    NbDialogModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class ConsigneEnCoursModule { }
