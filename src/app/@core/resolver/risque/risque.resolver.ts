import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { RisqueService } from '../../api';

@Injectable({ providedIn: 'root' })
export class RisquesResolver implements Resolve<any> {
    constructor(private risqueService: RisqueService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return this.risqueService.getRisques();
    }
}