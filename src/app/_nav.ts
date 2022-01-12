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
    name: 'LES ENTITIES DANS PAMO'
  },
  {
    name: 'News',
    url: '/theme/news',
    icon: 'fa fa-book fa-lg mt-4'
  },
  {
    name: 'Les Utilisateurs',
    url: '/theme/utilisateur',
    icon: 'icon-user'
  },
  {
    name: 'Les Roles',
    url: '/theme/autres',
    icon: 'fa fa-server fa-lg mt-4'
  },
  {
    name: 'Meeting',
    url: '/theme/meeting',
    icon: 'fa fa-server fa-lg mt-4'
  },
  {
    name: 'Les Spécialités des Medecins',
    url: '/theme/autres',
    icon: 'fa fa-server fa-lg mt-4'
  },
  {
    name: 'Prestataires',
    url: '/theme/prestataire',
    icon: 'fa fa-server fa-lg mt-4'
  },
  {
    name: 'Structures Sanitaires',
    url: '/theme/structure-sanitaire',
    icon: 'fa fa-server fa-lg mt-4'
  },
  {
    title: true,
    name: 'Components'
  }
];
