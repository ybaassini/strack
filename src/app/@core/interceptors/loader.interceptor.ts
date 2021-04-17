
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { LoaderService } from '../services/loader.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(public loaderService: LoaderService) {}
  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.loaderService.onLoad.next(true);
    return next.handle(request).do((event) => {
      if (event instanceof HttpResponse || event instanceof HttpErrorResponse) {
        this.loaderService.onLoad.next(false);
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        this.loaderService.onLoad.next(false);
      }
    });
  }
}
