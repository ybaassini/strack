/**
 * EPR api
 * The list of EPR project endpoints
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { AppuiConseilDto } from '../model/appuiConseilDto';
import { CreateAppuiConseilDto } from '../model/createAppuiConseilDto';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable({
  providedIn: 'root'
})
export class AppuiConseilService {

    protected basePath = 'http://localhost:4200';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * 
     * @param createAppuiConseilDto 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createAppuiConseil(createAppuiConseilDto: CreateAppuiConseilDto, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public createAppuiConseil(createAppuiConseilDto: CreateAppuiConseilDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public createAppuiConseil(createAppuiConseilDto: CreateAppuiConseilDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public createAppuiConseil(createAppuiConseilDto: CreateAppuiConseilDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (createAppuiConseilDto === null || createAppuiConseilDto === undefined) {
            throw new Error('Required parameter createAppuiConseilDto was null or undefined when calling createAppuiConseil.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/api/appui-conseils`,
            createAppuiConseilDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAppuiConseil(id: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getAppuiConseil(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getAppuiConseil(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getAppuiConseil(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getAppuiConseil.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/api/appui-conseils/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getAppuiConseils(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getAppuiConseils(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getAppuiConseils(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getAppuiConseils(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/api/appui-conseils`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * 
     * @param appuiConseilDto 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateAppuiConseil(appuiConseilDto: AppuiConseilDto, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateAppuiConseil(appuiConseilDto: AppuiConseilDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateAppuiConseil(appuiConseilDto: AppuiConseilDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateAppuiConseil(appuiConseilDto: AppuiConseilDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (appuiConseilDto === null || appuiConseilDto === undefined) {
            throw new Error('Required parameter appuiConseilDto was null or undefined when calling updateAppuiConseil.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<any>(`${this.basePath}/api/appui-conseils`,
            appuiConseilDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
