import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ConsigneService } from '../../api';

@Injectable({ providedIn: 'root' })
export class ConsignesResolver implements Resolve<any> {
    constructor(private consigneService: ConsigneService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return this.consigneService.getConsignes();
    }
}
