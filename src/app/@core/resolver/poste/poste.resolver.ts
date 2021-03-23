import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PosteService } from '../../api';

@Injectable({ providedIn: 'root' })
export class PosteResolver implements Resolve<any> {
    constructor(public posteService: PosteService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        const id = route.data.snapshot.paramMap.get('id');
        return this.posteService.getPoste(id);
    }
}
