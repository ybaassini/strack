/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "./@core/utils/analytics.service";
import { SeoService } from "./@core/utils/seo.service";
import { ApiHandlerService } from "./lib/api-handler";

@Component({
  selector: "ngx-app",
  template: `
    <div
      [class.loader-overlay__display]="apiHandlerService.isLoading | async"
      class="loader-overlay"
    >
      <div class="spinner-border text-primary" style="width: 80px; height: 80px;"></div>
    </div>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public apiHandlerService: ApiHandlerService,
    private analytics: AnalyticsService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
  }
}
