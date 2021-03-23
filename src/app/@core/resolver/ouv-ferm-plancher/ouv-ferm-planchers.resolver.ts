import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PlancherService } from '../../api';

@Injectable({ providedIn: 'root' })
export class PlanchersResolver implements Resolve<any> {
    constructor(private plancherService: PlancherService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return this.plancherService.getPlanchers();
    }
}
