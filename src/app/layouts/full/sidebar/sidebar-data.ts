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
    iconName: 'luggage',
    route: '/dashboard',
  },
  {
    navCap: 'Housekeeping',
  },
  {
    displayName: 'Rooms',
    iconName: 'bed',
    route: '/rooms',
  },
  {
    displayName: 'Categories',
    iconName: 'stars',
    route: '/categories',
  },
];
