import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { LocalStorageService } from 'app/@core/services/local-storage.service';
import { Observable } from 'rxjs';
import { MaterielService } from '../../api';

@Injectable({ providedIn: 'root' })
export class MaterielsByPosteResolver implements Resolve<any> {
    constructor(private materielService: MaterielService,
        private localStorageService: LocalStorageService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        const poste = this.localStorageService.getItem('poste');
        return this.materielService.getMateriels(poste.id);
    }
}
