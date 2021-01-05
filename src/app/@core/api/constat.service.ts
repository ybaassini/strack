import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
@Injectable({providedIn: 'root'})
export class ConstatService {
    public url = 'api/postes/constat';
    constructor(private httpClient: HttpClient) { }
    
    /**
     * getProjets
     */
    public getConstats(query: any) {
        return this.httpClient.get(this.url, query);
    }

    /**
     * getProjets
     */
    public getConstat(id: string) {
        return this.httpClient.get(`${this.url}/${id}`);
    }

    /**
     * create Constat
     */
    public createConstat(posteId: string, constat: any) {
        const id = uuidv4();
        const poste = JSON.parse(localStorage.getItem('poste'));
        const postes = JSON.parse(localStorage.getItem('postes')) || [];
        const index = postes.findIndex(poste => poste.id == posteId);
        poste.constats.push({...constat, id});
        postes[index].constats.push({...constat, id});
        
        localStorage.setItem('poste', JSON.stringify(poste));
        localStorage.setItem('postes', JSON.stringify(postes));
        // return this.httpClient.post(`${this.url}`, {
        //     constat,
        //     posteId
        // });
    }

    /**
     * create Constat
     */
    public updateConstat(posteId: string, constat: any) {
        const poste = JSON.parse(localStorage.getItem('poste'));
        const postes = JSON.parse(localStorage.getItem('postes')) || [];
        const indexPoste = postes.findIndex(poste => poste.id == posteId);
        const indexConstat = poste.constats.findIndex(c => constat.id == c.id);
        poste.constats[indexConstat] = constat;
        postes[indexPoste] = poste;
        localStorage.setItem('poste', JSON.stringify(poste));
        localStorage.setItem('postes', JSON.stringify(postes));
        // return this.httpClient.put(`${this.url}`, {
        //     constat,
        //     posteId
        // });
    }


}