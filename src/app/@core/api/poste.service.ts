import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

@Injectable({providedIn: 'root'})
export class PosteService {
    // public $posteInProgress: BehaviorSubject<any> = new BehaviorSubject({});
    // public $postesFinished: BehaviorSubject<any> = new BehaviorSubject({});
    public url = 'api/postes';
    constructor(private httpClient: HttpClient) { 
        // this.$posteInProgress.next(JSON.parse(localStorage.getItem('poste')));
    }
    
    /**
     * getProjets
     */
    public getPostes(query: any) {
        const postes = JSON.parse(localStorage.getItem('postes'));
        return postes;
        // return this.httpClient.get(this.url, query);
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
        const id = uuidv4();
        const posteToSave = {...poste, id, status: 'in progress', constats: []};
        localStorage.setItem('poste', JSON.stringify(posteToSave));
        const postes = JSON.parse(localStorage.getItem('postes')) || [];
        postes.push(posteToSave);
        localStorage.setItem('postes', JSON.stringify(postes));
        // return this.httpClient.post(`${this.url}`, poste);
    }

    // public updatePosteInProgress(poste) {
    //     this.$posteInProgress.next(poste);
    //     localStorage.setItem('poste', JSON.stringify(poste));
    // }

}