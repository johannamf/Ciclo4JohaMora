import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  
  {
    title: 'Home',
    icon: 'home-outline',
    link: '/'
  },
  {
    title: 'Nosotros',
    icon: 'globe-outline',
    link: '/pages/nosotros',
  },
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
    title: 'Resultados',
    icon: 'star-outline',
    link: '/pages/resultados/mostrar',
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
        title: 'LogOut',
        link: '/pages/seguridad/logout',
      },
    ],
  },
];
