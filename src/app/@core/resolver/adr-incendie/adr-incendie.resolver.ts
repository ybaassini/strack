import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AdrService } from '../../api';

@Injectable({ providedIn: 'root' })
export class AdrResolver implements Resolve<any> {
    constructor(private adrService: AdrService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        const id = route.data.snapshot.paramMap.get('id');
        return this.adrService.getAdr(id);
    }
}
