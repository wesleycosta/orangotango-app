import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Reservations',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    displayName: 'Reservations',
    iconName: 'building-skyscraper',
    route: 'ui-components/lists',
  },
  {
    navCap: 'Gorvernanca',
  },
  {
    displayName: 'Rooms',
    iconName: 'bed',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Categories',
    iconName: 'stars',
    route: '/categories',
  }
];
