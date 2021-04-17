import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
/**
 * Load the implementations that should be tested
 */
import { ApiMsgComponent } from './api-msg.component';
import { ApiHandlerService } from '../../services';
import { LoaderService } from '../../../../core/services';

describe('ApiMsgComponent', () => {
  let comp: ApiMsgComponent;
  let fixture: ComponentFixture<ApiMsgComponent>;

  /**
   * async beforeEach
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ],
      declarations: [ ApiMsgComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ApiHandlerService, LoaderService]
    })
    /**
     * Compile template and css
     */
    .compileComponents();
  }));

  /**
   * Synchronous beforeEach
   */
  beforeEach(() => {
    fixture = TestBed.createComponent(ApiMsgComponent);
    comp    = fixture.componentInstance;

    /**
     * Trigger initial data binding
     */
    fixture.detectChanges();
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });
});
