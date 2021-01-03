import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAccordionModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { AuthRoutingModule, routedComponents } from './auth-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbRadioModule,
    NbButtonModule,
    NbDatepickerModule,
    NbSelectModule,
    NbCheckboxModule,
    NbAuthModule,
    ThemeModule,
    HttpClientModule,
    AuthRoutingModule
  ],
  declarations: [
    ...routedComponents,
  ],
})
export class AuthModule { }
