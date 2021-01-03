import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class ZoneService {
    public url = '/zones';
    constructor(private httpClient: HttpClient) { }
    
    /**
     * getZones
     */
    public getZones(query: any) {
        return this.httpClient.get(this.url, query);
    }

        /**
     * getZones
     */
    public getZone(id: string) {
        return this.httpClient.get(`${this.url}/${id}`);
    }
}