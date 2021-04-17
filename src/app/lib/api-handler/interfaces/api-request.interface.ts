import { HttpMethod } from '../types';
import { ApiResponse } from './api-response.interface';

export interface ApiRequest {
  method: HttpMethod;
  responses: ApiResponse[];
}
