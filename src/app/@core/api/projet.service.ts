import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ProjetService {
    public url = '/projets';
    constructor(private httpClient: HttpClient) { }
    
    /**
     * getProjets
     */
    public getProjets(query: any) {
        return this.httpClient.get(this.url, query);
    }

        /**
     * getProjets
     */
    public getProjet(id: string) {
        return this.httpClient.get(`${this.url}/${id}`);
    }
}