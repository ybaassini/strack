import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PosteService } from '../api';
import { PROJETS } from '../mock';

@Injectable({ providedIn: 'root' })
export class PostesResolver implements Resolve<any> {
    constructor(public posteService: PosteService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        const poste = JSON.parse(localStorage.getItem('poste'));

        return this.posteService.getPostes({zone: poste.zone, projet: poste.projet});
    }
}