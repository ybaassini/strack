import { ApiCall } from '../interfaces';

const tranBase = 'LIB.api-handler.responses.';

const tran = (key) => {
  return tranBase + key;
};

export const apiCallsMock: ApiCall[] = [
  {
    slug: 'sessions',
    endpoint: '/api/sessions',
    requests: [
      {
        method: 'POST',
        responses: [
          { code: 404, message: tran('user-not-found') },
          { code: 200, message: tran('connection-successfull') }
        ]
      }
    ]
  }
];
