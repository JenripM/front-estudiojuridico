import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppTrabajadoresComponent } from './trabajadores/trabajadores.component';
import { AppTrabajadorRegistrarComponent } from './trabajadores/registrar/registrar.component';
import { CasosRegistrarComponent } from './casosjuridicos/registrar/registrar.component';
import { CasosEditarComponent } from './casosjuridicos/editar/editar.component';
import { CasosCasoComponent } from './casosjuridicos/caso/caso.component';
import { ActividadesRegistrarComponent } from './casosjuridicos/actividades/registrar/registrar.component';
import { ActividadesEliminarComponent } from './casosjuridicos/actividades/eliminar/eliminar.component';
import { ActividadesEditarComponent } from './casosjuridicos/actividades/editar/editar.component';
import { CargoComponent } from './cargo/cargo.component';
import { EditarComponent } from './trabajadores/editar/editar.component';
import { EliminarComponent } from './trabajadores/eliminar/eliminar.component';
import { RolesUsuarioComponent } from './roles-usuario/roles-usuario.component';
import { UsuarioRegistrarComponent } from './roles-usuario/registrar/registrar.component';
import { UsuarioEliminarComponent } from './roles-usuario/eliminar/eliminar.component';
import { UsuarioEditarComponent } from './roles-usuario/editar/editar.component';
import { CasosjuridicosComponent } from './casosjuridicos/casosjuridicos.component';
import { AsignaciontareasComponent } from './asignaciontareas/asignaciontareas.component';
import { AppDocumentosComponent } from './documentos/documentos.component';
import { CorrespondenciaComponent } from './correspondencia/correspondencia.component';
import { CasosEliminarComponent } from './casosjuridicos/eliminar/eliminar.component';
import { RegistrarComponent } from './documentos/registrar/registrar.component';
import { DocumentosEditarComponent } from './documentos/editar/documentos-editar/documentos-editar.component';
import { DocumentosEliminarComponent } from './documentos/eliminar/documentos-eliminar/documentos-eliminar.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'badge',
        component: AppBadgeComponent,
      },
      {
        path: 'trabajadores',
        component: AppTrabajadoresComponent,
      },
      {
        path: 'trabajadores/registrar',
        component: AppTrabajadorRegistrarComponent,
      },
      {
        path: 'trabajadores/editar/:id',
        component: EditarComponent,
      },
      {
        path: 'trabajadores/eliminar/:id',
        component: EliminarComponent,
      },
      {
        path: 'cargo',
        component: CargoComponent,
      },
      {
        path: 'casosjuridicos',
        component: CasosjuridicosComponent,
      },
      {
        path: 'casosjuridicos/registrar',
        component: CasosRegistrarComponent,
      },
      {
        path: 'casosjuridicos/caso/:id',
        component: CasosCasoComponent,
      },
      {
        path: 'casosjuridicos/editar/:id',
        component: CasosEditarComponent,
      },
      {
        path: 'casosjuridicos/eliminar/:id',
        component: CasosEliminarComponent,
      },
      {
        path: 'casosjuridicos/actividades/registrar/:id',
        component: ActividadesRegistrarComponent,
      },
      {
        path: 'casosjuridicos/actividades/eliminar/:id',
        component: ActividadesEliminarComponent,
      },
      {
        path: 'casosjuridicos/actividades/editar/:id',
        component: ActividadesEditarComponent,
      },
      {
        path: 'asignaciontareas',
        component: AsignaciontareasComponent,
      },
      {
        path: 'documentos',
        component: AppDocumentosComponent,
      },
      {
        path: 'documentos/registrar',
        component: RegistrarComponent,
      },
      {
        path: 'documentos/editar/:id',
        component: DocumentosEditarComponent,
      },
      {
        path: 'documentos/eliminar/:id',
        component: DocumentosEliminarComponent,
      },
      {
        path: 'correspondencia',
        component: CorrespondenciaComponent,
      },
      {
        path: 'roles-usuario',
        component: RolesUsuarioComponent,
      },
      {
        path: 'roles-usuario/registrar',
        component: UsuarioRegistrarComponent,
      },
      {
        path: 'roles-usuario/eliminar/:id',
        component: UsuarioEliminarComponent,
      },
      {
        path: 'roles-usuario/editar/:id',
        component: UsuarioEditarComponent,
      },
    ],
  },
];
