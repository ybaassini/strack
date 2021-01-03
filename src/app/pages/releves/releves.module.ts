import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTabsetModule, NbTreeGridModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { RelevesRoutingModule, routedComponents } from './releves-routing.module';

@NgModule({
  imports: [
    NbCardModule,
    NbTabsetModule,
    NbTreeGridModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    RelevesRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...routedComponents
  ],
})
export class RelevesModule { }
