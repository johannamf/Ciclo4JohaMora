import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  
  {
    title: 'Candidatos',
    icon: 'people-outline',
    children: [
      {
        title: 'Ver todos',
        link: '/pages/candidatos/listar',
      },
      {
        title: 'Crear candidato',
        link: '/pages/candidatos/crear',
      }
    ],
  },

  {
    title: 'Partidos',
    icon: 'list-outline',
    children: [
      {
        title: 'Ver todos',
        link: '/pages/partidos/listar',
      },
      {
        title: 'Crear partido',
        link: '/pages/partidos/crear',
      },
    ],
  },
  {
    title: 'Mesas',
    icon: 'keypad-outline',
    children: [
      {
        title: 'Ver todas',
        link: '/pages/mesas/listar',
      },
      {
        title: 'Crear mesa',
        link: '/pages/mesas/crear',
      }

    ],
  },
  {
    title: 'Usuarios',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/pages/seguridad/login',
      },
      {
        title: 'Registrar Nuevo Usuario',
        link: '/auth/register',
      },
      {
        title: 'Solicitar Password',
        link: '/auth/request-password',
      },
      {
        title: 'LogOut',
        link: '/auth/logout',
      },
    ],
  },
];
