import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { ApiHandlerService } from '../../services';
import { ApiResponse } from '../../interfaces';
import { HttpMethod } from '../../types';

@Component({
  selector: 'app-api-msg',
  templateUrl: './api-msg.component.html',
  styleUrls: ['./api-msg.component.scss']
})
export class ApiMsgComponent implements OnInit, OnDestroy {
  @Input() private slug: string;
  @Input() private method: HttpMethod;

  constructor(private apiHandlerService: ApiHandlerService) { }

  public ngOnInit() {}

  public ngOnDestroy() {
    this.apiHandlerService.clearResponses(this.slug, this.method);
  }

  /**
   * Get api call registered response
   */
  public getResponse(): ApiResponse {
    return this.apiHandlerService.getActiveCallResponse(this.slug, this.method);
  }

  /**
   * return true if the registered response is an error response
   */
  public isError(): boolean {
    return this.apiHandlerService.isErrorResponse(this.slug, this.method);
  }

  /**
   * Return true if the component needs to be hidden (if there is no data related)
   */
  public isHidden(): boolean {
    return !this.apiHandlerService.isCallExists(this.slug, this.method);
  }
}
