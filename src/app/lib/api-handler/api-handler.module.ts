import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiInterceptor } from './interceptors';
import { ApiHandlerService } from './services';
import { ApiInfoComponent, ApiMsgComponent } from './components';

@NgModule({
  declarations: [
    ApiInfoComponent
  ],
  imports: [ CommonModule ],
  exports: [
    ApiInfoComponent
  ],
  providers: [
    ApiHandlerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
      deps: [ ApiHandlerService ],
    }
  ]
})
export class ApiHandlerModule {}
