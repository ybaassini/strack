import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PdfService } from '../../api';

@Injectable({ providedIn: 'root' })
export class PdfsResolver implements Resolve<any> {
    constructor(private pdfService: PdfService) {}
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        return this.pdfService.getPdfs();
    }
}
