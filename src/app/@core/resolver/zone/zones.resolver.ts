import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ZoneService } from 'app/@core/api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ZonesResolver implements Resolve<any> {

    constructor(private zoneService: ZoneService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return this.zoneService.getZones();
    }
}