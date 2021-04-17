import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
  HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

import { ApiHandlerService } from '../../services';
import { finalize } from 'rxjs/operators';

export class ApiInterceptor implements HttpInterceptor {
  constructor(private apiHandlerService: ApiHandlerService) {}
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('/api')) {
      this.apiHandlerService.callsPending.next(true);
      return next.handle(req)
      .do((res: HttpEvent<any>) => {
        if (res instanceof HttpResponse) {
          this.apiHandlerService.registerResponse(req, res);
        }
      }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.apiHandlerService.registerResponse(req, err);
        }
      })
      .pipe(
        finalize(() => {
          this.apiHandlerService.callsPending.next(false);
        }),
      )
    }
    return next.handle(req);
  }
}
