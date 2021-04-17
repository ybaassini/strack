import { ApiCall } from './interfaces';

const tranBase = 'LIB.api-handler.responses.';

const tran = (key) => {
  return tranBase + key;
};

export const apiCalls: ApiCall[] = [
  // USER
  {
    slug: 'sessions',
    endpoint: '/api/sessions',
    exact: true,
    requests: [
      {
        method: 'POST',
        responses: [
          { code: 401, message: tran('invalid-credentials') },
          { code: 404, message: tran('user-not-found') },
          { code: 200, message: tran('connection-successfull') }
        ]
      }
    ]
  },
  {
    slug: 'users-me',
    endpoint: '/api/secure/users/me',
    requests: [
      {
        method: 'GET',
        responses: [
          { code: 401, message: tran('users-me.GET.401'), info: true },
          { code: 500, message: tran('users-me.GET.500'), info: true }
        ]
      },
      {
        method: 'PATCH',
        responses: [
          { code: 200, message: tran('users-me.PATCH.200'), info: true },
          { code: 400, message: tran('users-me.PATCH.400'), info: true },
          { code: 423, message: tran('users-me.PATCH.423'), info: true }
        ]
      }
    ]
  },
  {
    slug: 'create-user',
    endpoint: '/api/users',
    requests: [
      {
        method: 'POST',
        responses: [
          { code: 200, message: tran('create-user.POST.200'), info: true },
          { code: 400, message: tran('create-user.POST.400'), info: true },
        ]
      }
    ]
  },
  // TERMS
  {
    slug: 'term',
    endpoint: '/api/terms_and_conditions',
    requests: [
      {
        method: 'GET',
        responses: [
          { code: 404, message: tran(''), info: false }
        ]
      }
    ]
  },
  // CAR DEALER
  {
    slug: 'dealer-locator',
    endpoint: '/api/dealer_locator',
    requests: [
      {
        method: 'GET',
        responses: [
          { code: 400, message: tran('postcode-invalid') }
        ]
      }
    ]
  },
  // VISUALS
  {
    slug: '360-exterior',
    endpoint: '/api/visual/360/exterior',
    requests: [
      {
        method: 'GET',
        responses: [
          { code: 404, message: tran('360.not-found'), info: true },
        ]
      }
    ]
  },
  {
    slug: '360-interior',
    endpoint: '/api/visual/360/interior',
    requests: [
      {
        method: 'GET',
        responses: [
          { code: 404, message: tran('360.not-found'), info: true },
        ]
      }
    ]
  },
  {
    slug: 'upload-additional-document',
    endpoint: '/api/secure/upload_additional_document',
    requests: [
      {
        method: 'POST',
        responses: [
          { code: 200, message: tran('upload-additional-document.POST.200') },
          { code: 404, message: tran('upload-additional-document.POST.404') }
        ]
      }
    ]
  },
  {
    slug: 'reset-password-sending',
    endpoint: '/api/send_token_reset_password',
    requests: [
      {
        method: 'POST',
        responses: [
          { code: 200, message: tran('reset-password-sending.POST.200') },
          { code: 404, message: tran('reset-password-sending.POST.404') },
          { code: 409, message: tran('reset-password-sending.POST.409') }
        ]
      }
    ]
  },
  {
    slug: 'reset-password-confirmation',
    endpoint: '/api/confirm_reset_password',
    requests: [
      {
        method: 'POST',
        responses: [
          { code: 200, message: tran('reset-password-confirmation.POST.200'), info: true },
          { code: 404, message: tran('reset-password-confirmation.POST.404') },
          { code: 400, message: tran('reset-password-confirmation.POST.400') },
          { code: 408, message: tran('reset-password-confirmation.POST.408') },
          { code: 422, message: tran('reset-password-confirmation.POST.422') },
        ]
      }
    ]
  },
  {
    slug: 'quotes-anonymous',
    endpoint: '/api/quotes/anonymous',
    requests: [
      {
        method: 'POST',
        responses: [
          { code: 422,  message: tran('quotes-anonymous.POST.422'), info: true }
        ]
      }
    ]
  },
  {
    slug: 'quotes-logged-in',
    endpoint: '/api/secure/quotes',
    requests: [
      {
        method: 'PUT',
        responses: [
          { code: 410, message: tran('quotes-logged-in.PUT.409'), info: true },
          { code: 423, message: tran('quotes-logged-in.PUT.423'), info: true },
          { code: 406, message: tran('quotes-logged-in.PUT.406'), info: true },
          { code: 409, message: tran('quotes-logged-in.PUT.409'), info: true },
        ]
      },
      {
        method: 'POST',
        responses: [
          { code: 410, message: tran('quotes-logged-in.PUT.409'), info: true },
          { code: 423, message: tran('quotes-logged-in.PUT.423'), info: true },
          { code: 406, message: tran('quotes-logged-in.PUT.406'), info: true }
        ]
      },
      {
        method: 'GET',
        responses: [
          { code: 410, message: tran('quotes-logged-in.PUT.409'), info: true },
          { code: 423, message: tran('quotes-logged-in.PUT.423'), info: true },
        ]
      }
    ]
  },
  {
    slug: 'quote-logged-in',
    endpoint: '/api/secure/quote/',
    requests: [
      {
        method: 'GET',
        responses: [
          { code: 404, message: tran('quotes-logged-in.GET.404'), info: true },
        ]
      }
    ]
  },
  {
    slug: 'worldpay-payment',
    endpoint: '/api/secure/worldpay/payment',
    requests: [
      {
        method: 'POST',
        responses: [
          { code: 409, message: tran('worldpay-payment.POST.409'), info: true, noTimeout: true }
        ]
      }
    ]
  }
];
