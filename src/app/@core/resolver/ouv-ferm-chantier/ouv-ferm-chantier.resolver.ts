import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ChantierService } from '../../api';

@Injectable({ providedIn: 'root' })
export class ChantierResolver implements Resolve<any> {
    constructor(private chantierService: ChantierService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        const id = route.data.snapshot.paramMap.get('id');
        return this.chantierService.getChantier(id);
    }
}
