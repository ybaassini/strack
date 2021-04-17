import { HttpMethod } from '../types';

export interface ApiCallActive {
  code: number;
  method: HttpMethod;
  slug: string;
}
