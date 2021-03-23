import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterielService } from '../../api';

@Injectable({ providedIn: 'root' })
export class MaterielsResolver implements Resolve<any> {
    constructor(private materielService: MaterielService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return this.materielService.getMateriels();
    }
}
