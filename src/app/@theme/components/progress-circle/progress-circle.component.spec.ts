import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ProgressCircleComponent } from './progress-circle.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

describe('ProgessCircleComponent test', () => {
  let component: ProgressCircleComponent;
  let fixture: ComponentFixture<ProgressCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressCircleComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressCircleComponent);
    component = fixture.componentInstance;
    component.percent = 10;
    component.size = 120;
    component.strokeWidth = 12;
    fixture.detectChanges();

    jasmine.clock().uninstall(); // Needed otherwise throws an error
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should be readly initialized', () => {
    expect(fixture).toBeDefined();
    expect(component).toBeDefined();
  });

  it('should set position and size of the progress bar', () => {
    // Input data
    expect(component.percent).toEqual(10);
    expect(component.size).toEqual(120);
    expect(component.strokeWidth).toEqual(12);

    // Calculated data
    expect(component.position).toEqual(60);
    expect(component.radius).toEqual(54);
    expect(component.viewBox).toEqual('0 0 120 120');
    expect(component.dashArray).toEqual(339);
  });

  it(`should animate from 0% to 10% (on init)`, () => {
    component.drawPercent(true);

    // drawPercent() changes dashOffset value after 500ms
    // So we check its value before and after
    expect(component.dashOffset).toEqual(339);
    jasmine.clock().tick(501);
    expect(component.dashOffset).toEqual(305);
  });

  it(`should animate from 10% to 50% (on change)`, () => {
    // Set dashOffset value equivalent to 10%
    component.dashOffset = 305;
    // Change percent
    component.percent = 50;
    component.drawPercent(false);

    // drawPercent() changes dashOffset value after 500ms
    // So we check its value before and after
    expect(component.dashOffset).toEqual(305);
    jasmine.clock().tick(501);
    expect(component.dashOffset).toEqual(170);
  });

});
