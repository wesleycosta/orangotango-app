import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Management',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/',
  },
  {
    displayName: 'Reservations',
    iconName: 'building-skyscraper',
    route: '/dashboard',
  },
  {
    navCap: 'Housekeeping',
  },
  {
    displayName: 'Categories',
    iconName: 'stars',
    route: '/categories',
  },
  {
    displayName: 'Rooms',
    iconName: 'bed',
    route: '/rooms',
  },
];
