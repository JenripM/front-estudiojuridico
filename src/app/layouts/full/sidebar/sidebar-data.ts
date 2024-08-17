import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Opciones',
  },
  {
    displayName: 'Gestión de Clientes',
    iconName: 'rosette',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Gestion de Trabajadores',
    iconName: 'poker-chip',
    route: '/ui-components/trabajadores',
  },
  {
    displayName: 'Gestion de Casos Juridicos',
    iconName: 'list',
    route: '/ui-components/casosjuridicos',
  },
  {
    displayName: 'Asignacion de Tareas',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/asignaciontareas',
  },
  {
    displayName: 'Gestion de Documentos',
    iconName: 'tooltip',
    route: '/ui-components/documentos',
  },
  /*{
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },*/
 
  {
    displayName: 'Correspondencia',
    iconName: 'mood-smile',
    route: '/ui-components/correspondencia',
  },
  {
    navCap: '',
  },
  {
    navCap: 'Autorización',
  },
  {
    displayName: 'Gestión de Accesos',
    iconName: 'lock',
    route: '/ui-components/roles-usuario',
  },
];
