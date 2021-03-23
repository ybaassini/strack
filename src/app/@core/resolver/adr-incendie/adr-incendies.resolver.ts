import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdrService } from '../../api';

@Injectable({ providedIn: 'root' })
export class AdrsResolver implements Resolve<any> {
    constructor(private adrService: AdrService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return this.adrService.getAdrs();
    }
}
