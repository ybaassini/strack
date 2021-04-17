import { Component, OnInit } from '@angular/core';

import { ApiHandlerService } from '../../services';
import { ApiResponse } from '../../interfaces';
import { HttpMethod } from '../../types';

@Component({
  selector: 'app-api-info',
  templateUrl: './api-info.component.html',
  styleUrls: ['./api-info.component.scss']
})
export class ApiInfoComponent implements OnInit {
  public isActive = false;
  public isDanger = true;
  public isClose = false;
  public timer;
  constructor(public apiHandlerService: ApiHandlerService) { }

  public ngOnInit() {
    this.apiHandlerService.currentInfo
      .subscribe((res) => {
        if (this.timer) {
          clearTimeout(this.timer);
        }

        this.isDanger = res.code >= 400;
        this.isActive = true;
        this.isClose = false;

        this.timer = setTimeout(() => {
          this.isActive = res.noTimeout;
        }, 5600);
      });
  }

  public close(): void {
    this.isClose = true;
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.isActive = false;
      this.isClose = false;
    }, 500);
  }
}
