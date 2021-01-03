import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ZONES } from '../mock';

@Injectable({ providedIn: 'root' })
export class ZonesResolver implements Resolve<any> {
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return ZONES;
    }
}