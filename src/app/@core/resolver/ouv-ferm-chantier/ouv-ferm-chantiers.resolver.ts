import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ChantierService } from '../../api';

@Injectable({ providedIn: 'root' })
export class ChantiersResolver implements Resolve<any> {
    constructor(private chantierService: ChantierService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return this.chantierService.getChantiers();
    }
}
