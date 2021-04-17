import { ApiRequest } from './api-request.interface';

export interface ApiCall {
  exact?: boolean;
  slug: string;
  endpoint: string;
  requests: ApiRequest[];
}
