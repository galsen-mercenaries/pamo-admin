import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'News',
    url: '/theme/news',
    icon: 'fa fa-book fa-lg mt-4'
  },
  {
    name: 'Utilisateurs',
    url: '/theme/utilisateur',
    icon: 'icon-user'
  },
  {
    name: 'Autres Services',
    url: '/theme/autres',
    icon: 'fa fa-server fa-lg mt-4'
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      }
    ]
  }
];
