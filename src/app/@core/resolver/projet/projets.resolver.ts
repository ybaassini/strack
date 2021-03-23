import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjetService } from '../../api';

@Injectable({ providedIn: 'root' })
export class ProjetsResolver implements Resolve<any> {
    constructor(private projetService: ProjetService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return this.projetService.getProjets();
    }
}