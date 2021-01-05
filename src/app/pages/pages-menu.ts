import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'Poste',
    icon: 'book-open-outline',
    link: '/pages/poste'
  },
  {
    title: 'Cartographie',
    icon: 'layout-outline',
    link: '/pages/cartographie',
  },
  {
    title: 'Log J-24R',
    icon: 'edit-2-outline',
    link: '/pages/logJ24R',
  },
  {
    title: 'Consignes',
    icon: 'keypad-outline',
    children: [
      {
        title: 'CA vers RZ',
        link: '/pages/consignes/ca-rz',
      },
      {
        title: 'RZ vers RZ',
        link: '/pages/consignes/rz-rz',
      }
    ]
  },
  {
    title: 'Constats à traiter',
    icon: 'browser-outline',
  },
  {
    title: 'Relevés',
    icon: 'message-circle-outline',
    children: [
      {
        title: 'Balises',
        link: '/pages/releves/balise',
      },
      {
        title: 'C2',
        link: '/pages/releves/c2',
      },
    ],
  },
  {
    title: 'Point materiel',
    icon: 'map-outline',
  },
  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
