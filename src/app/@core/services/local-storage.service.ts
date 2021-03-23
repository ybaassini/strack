import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class LocalStorageService {
    constructor() { }
    
    /**
     * getItem
     */
    public getItem(item: string) {
        const obj = localStorage.getItem(item);
        if (!obj) {
            throw new Error(`No ${item} found in localStorage`);
        }
        return JSON.parse(obj);
    }

    /**
     * setItem
     */
    public setItem(item: any, attribute: string) {
        localStorage.setItem(attribute, JSON.stringify(item));
    }
}