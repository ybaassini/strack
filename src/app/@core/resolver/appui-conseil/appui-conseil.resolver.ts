import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AppuiConseilService } from '../../api';

@Injectable({ providedIn: 'root' })
export class AppuiConseilResolver implements Resolve<any> {
    constructor(private appuiConseilService: AppuiConseilService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        const id = route.data.snapshot.paramMap.get('id');
        return this.appuiConseilService.getAppuiConseil(id);
    }
}
