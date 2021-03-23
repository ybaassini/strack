import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Di82Service } from '../../api';

@Injectable({ providedIn: 'root' })
export class Di82sResolver implements Resolve<any> {
    constructor(private di82Service: Di82Service) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return this.di82Service.getDi82s();
    }
}
