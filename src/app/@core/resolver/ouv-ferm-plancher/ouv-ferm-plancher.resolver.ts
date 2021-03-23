import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PlancherService } from '../../api';

@Injectable({ providedIn: 'root' })
export class PlancherResolver implements Resolve<any> {
    constructor(private plancherService: PlancherService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        const id = route.data.snapshot.paramMap.get('id');
        return this.plancherService.getPlancher(id);
    }
}
