import { Injectable } from '@angular/core';
import { HttpResponseBase, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { ApiCall, ApiCallActive, ApiResponse } from '../../interfaces';
import { apiCalls } from '../../api.register';
import { HttpMethod } from '../../types';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ApiHandlerService {
  public activeCalls: ApiCallActive[] = [];
  public apiCalls: ApiCall[] = apiCalls;
  public nbCallsPending = 0;
  public callsPending: Subject<boolean> = new Subject();
  public currentInfo: Subject<ApiResponse> = new Subject();
  public isLoading: Subject<boolean> = new Subject();

  constructor() {
    this.callsPending
      .subscribe(this.updateNbCallsActive.bind(this), this.updateNbCallsActive.bind(this));
  }

  /**
   * Clear responses for a specific slug and method
   */
  public clearResponses(slug: string, method: HttpMethod): void {
    if (this.isCallExists(slug, method)) {
      const index = this.activeCalls.findIndex((item) => item.slug === slug);
      this.activeCalls.splice(index, 1);
    }
  }

  /**
   * Get active call reponse by the given slug
   */
  public getActiveCallResponse(slug: string, method: HttpMethod): ApiResponse {
    let response: ApiResponse;

    if (this.isCallExists(slug, method)) {
      const code = this.activeCalls.find((item) => item.slug === slug).code;
      const call = this.apiCalls.find((item) => item.slug === slug);
      const req = call.requests.find((item) => item.method === method);

      if (req) {
        response = req.responses.find((res) => res.code === code);
      }
    }

    return response;
  }

  /**
   * Get the response corresponding the related item in registered api calls
   */
  public getResponse(req: HttpRequest<any>): ApiCall {
    return this.apiCalls.find((item) => item.exact ?
      item.endpoint === req.url :
      req.url.startsWith(item.endpoint));
  }

  public getResponseByReqRes(req: HttpRequest<any>, res: HttpResponseBase) {
    const method = req.method as HttpMethod;
    const code = res.status;
    const response = this.getResponse(req);

    return response.requests
      .find((item) => item.method === method)
      .responses
      .find((resp) => resp.code === code);
  }

  /**
   * Return true if the call exists in the active calls array
   */
  public isCallExists(slug: string, method: HttpMethod): boolean {
    return this.activeCalls
      .findIndex((item) => item.slug === slug && item.method === method) !== -1;
  }

  /**
   * Return true if it's a response error
   */
  public isErrorResponse(slug: string, method: HttpMethod): boolean {
    return this.isCallExists(slug, method) && this.getActiveCallResponse(slug, method) ?
      this.getActiveCallResponse(slug, method).code >= 400 :
      false;
  }

  /**
   * Register the api response in api calls
   */
  public registerResponse(req: HttpRequest<any>, res: HttpResponseBase): void {
    const method = req.method as HttpMethod;
    const code = res.status;
    const response = this.getResponse(req);

    let apiResponse: ApiResponse;
    if (response) {
      // tslint:disable-next-line:max-line-length
      apiResponse = this.getResponseByReqRes(req, res);

      if (code >= 500 || apiResponse && apiResponse.info) {
        this.currentInfo.next(apiResponse);
      }
      const slug = response.slug;
      this.activeCallsPutOrPush({ code, method, slug });
    } else if (code >= 500) {
      apiResponse = { code, message: 'An error occured on the server, please try again later' };
      this.currentInfo.next(apiResponse);
    }
    if (code >= 400 && code < 500 && !apiResponse) {
      this.currentInfo.next(this.setErrorFromServer(<HttpErrorResponse> res));
    }
  }

  public setErrorFromServer(res: HttpErrorResponse) {
    return { code: 400 , message: JSON.parse(res.error).message, info: true};
  }

  /**
   * Put or push a new call in the apiCallActive
   */
  private activeCallsPutOrPush(apiCallActive: ApiCallActive): void {
    const index = this.activeCalls.findIndex((item) => item.slug === apiCallActive.slug);
    if (index !== -1) {
      this.activeCalls[index] = apiCallActive;
    } else {
      this.activeCalls.push(apiCallActive);
    }
  }

  private updateNbCallsActive(active: boolean) {
    this.nbCallsPending += active ? 1 : -1;
    if (this.nbCallsPending < 0) {
      this.nbCallsPending = 0;
    }
    this.isLoading.next(this.nbCallsPending > 0);
  }
}
