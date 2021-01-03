import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PosteService {
    public url = 'api/postes';
    constructor(private httpClient: HttpClient) { }
    
    /**
     * getProjets
     */
    public getPostes(query: any) {
        return this.httpClient.get(this.url, query);
    }

    /**
     * getProjets
     */
    public getPoste(id: string) {
        return this.httpClient.get(`${this.url}/${id}`);
    }

    /**
     * getProjets
     */
    public createPoste(poste: any) {
        return this.httpClient.post(`${this.url}`, poste);
    }

}