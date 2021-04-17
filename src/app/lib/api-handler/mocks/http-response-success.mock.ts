import { HttpResponse } from '@angular/common/http';

export const apiResponseSuccessMock: HttpResponse<any> = new HttpResponse({
  body: {},
  status: 200,
  url: 'http://localhost:3000/api/sessions'
});
