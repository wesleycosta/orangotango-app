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
    iconName: 'list',
    route: 'ui-components/lists',
  },
  {
    navCap: 'Gorvernanca',
  },
  {
    displayName: 'Rooms',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Categories',
    iconName: 'poker-chip',
    route: '/categories',
  }
];
