import {
  inject,
  TestBed,
  getTestBed
} from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse, HttpRequest } from '@angular/common/http';

import { ApiHandlerService } from './api-handler.service';
import { apiCallsMock } from '../../mocks';

describe('ApiHandlerService', () => {
  let injector: TestBed;
  let service: ApiHandlerService;
  let httpMock: HttpTestingController;
  let request: HttpRequest<any> = new HttpRequest('POST', '/api/sessions', null);
  let responseSuccess: HttpResponse<any> = new HttpResponse({
    body: {},
    status: 200,
    url: 'http://localhost:3000/api/sessions'
  });
  let responseError: HttpResponse<any> = new HttpResponse({
    body: {},
    status: 404,
    url: 'http://localhost:3000/api/sessions'
  });
  const SLUG = 'sessions';
  const METHOD = 'POST';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ApiHandlerService]
    });
    injector = getTestBed();
    service = injector.get(ApiHandlerService);
    service.apiCalls = apiCallsMock;
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a response', () => {
    service.registerResponse(request, responseSuccess);
  });

  it('should get response', () => {
    expect(service.getResponse(request)).toBeDefined();
  });

  it('should get active call response', () => {
    service.registerResponse(request, responseSuccess);
    expect(service.getActiveCallResponse(SLUG, METHOD)).toBeDefined();
  });

  it('should return true if a call exists in the activeCalls', () => {
    expect(service.isCallExists(SLUG, METHOD)).toBeFalsy();
    service.registerResponse(request, responseSuccess);
    expect(service.isCallExists(SLUG, METHOD)).toBeTruthy();
  });

  it('should get an active call response', () => {
    expect(service.getActiveCallResponse(SLUG, METHOD)).not.toBeDefined();
    service.registerResponse(request, responseSuccess);
    expect(service.getActiveCallResponse(SLUG, METHOD)).toBeDefined();
  });

  it('shoud return true if the reponse is an error', () => {
    service.registerResponse(request, responseError);
    expect(service.isErrorResponse(SLUG, METHOD)).toBeTruthy();
  });

  it('shoud return false if the reponse is not an error', () => {
    service.registerResponse(request, responseSuccess);
    expect(service.isErrorResponse(SLUG, METHOD)).toBeFalsy();
  });
});
